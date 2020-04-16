import json
from flask import request, _request_ctx_stack
from functools import wraps
from urllib.request import urlopen
from jose import jwt

from config import DevConfig
from error import ErrorCodes, ErrorMessages, CastingAgencyError

AUTH_CONFIG = DevConfig.get_auth0_credentials()


def get_token_auth_header():

    request_headers = request.headers

    if request_headers is None:
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_NO_HEADERS_FOUND.value,
            message=ErrorMessages.ERR_NO_HEADERS_FOUND.value,
            status_code=401
        )

    authorization = request_headers['Authorization']

    auth_arr = authorization.split(" ")

    if "Bearer" not in auth_arr or len(auth_arr) != 2:
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_MALFORMED_HEADER.value,
            message=ErrorMessages.ERR_MALFORMED_HEADER.value,
            status_code=401
        )

    token = auth_arr[1]

    return token


def check_permissions(permission, payload):

    if 'permissions' not in payload:
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_PERMISSIONS_NOT_INCLUDED.value,
            message=ErrorMessages.ERR_PERMISSIONS_NOT_INCLUDED.value,
            status_code=401
        )

    permissions = payload["permissions"]

    if permission not in permissions:
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_UNAUTHORIZED_ACTION.value,
            message=ErrorMessages.ERR_UNAUTHORIZED_ACTION.value,
            status_code=401
        )

    return True


'''
    @INPUTS
        token: a json web token (string)
    it should be an Auth0 token with key id (kid)
    it should verify the token using Auth0 /.well-known/jwks.json
    it should decode the payload from the token
    it should validate the claims
    return the decoded payload
    !!NOTE urlopen has a common certificate error described here:
    https://stackoverflow.com/questions/50236117/scraping-ssl-certificate-
    verify-failed-error-for-http-en-wikipedia-org
'''


def verify_decode_jwt(token):

    # GET THE PUBLIC KEY FROM AUTH0
    jsonurl = urlopen(
        f'https://{AUTH_CONFIG.get("domain")}/.well-known/jwks.json'
    )
    jwks = json.loads(jsonurl.read())

    # GET THE DATA IN THE HEADER
    unverified_header = jwt.get_unverified_header(token)

    # CHOOSE OUR KEY
    rsa_key = {}
    if 'kid' not in unverified_header:
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_MALFORMED_HEADER.value,
            message=ErrorMessages.ERR_MALFORMED_HEADER.value,
            status_code=401
        )

    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }

    # Finally, verify!!!
    if rsa_key:
        try:
            # USE THE KEY TO VALIDATE THE JWT
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=AUTH_CONFIG.get('algorithms'),
                audience=AUTH_CONFIG.get('audience'),
                issuer='https://' + AUTH_CONFIG.get('domain') + '/'
            )

            return payload

        except jwt.ExpiredSignatureError:
            raise CastingAgencyError(
                error_code=ErrorCodes.ERR_EXPIRED_TOKEN.value,
                message=ErrorMessages.ERR_EXPIRED_TOKEN.value,
                status_code=401
            )

        except jwt.JWTClaimsError:
            raise CastingAgencyError(
                error_code=ErrorCodes.ERR_INVALID_CLAIMS.value,
                message=ErrorMessages.ERR_INVALID_CLAIMS.value,
                status_code=401
            )

        except Exception:
            raise CastingAgencyError(
                error_code=ErrorCodes
                .ERR_FAILED_PARSING_AUTHENTICATION_TOKEN.value,
                message=ErrorMessages
                .ERR_FAILED_PARSING_AUTHENTICATION_TOKEN.value,
                status_code=400
            )

    raise CastingAgencyError(
        error_code=ErrorCodes.ERR_NO_APPROPRIATE_KEY_FOUND.value,
        message=ErrorMessages.ERR_NO_APPROPRIATE_KEY_FOUND.value,
        status_code=400
    )


def requires_auth(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token_auth_header()
            payload = verify_decode_jwt(token)
            check_permissions(permission, payload)
            return f(payload, *args, **kwargs)

        return wrapper
    return requires_auth_decorator
