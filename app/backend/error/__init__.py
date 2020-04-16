from enum import Enum


class CastingAgencyError(Exception):

    def __init__(self, error_code, status_code, message=''):

        self.error_code = error_code
        self.status_code = status_code
        self.message = message


class ErrorCodes(Enum):
    ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE = 'CAE0001'
    ERR_NO_ACTOR_FOUND_BY_GIVEN_ID = 'CAE0002'
    ERR_NO_ACTOR_PROVIDED_FOR_CREATION = 'CAE0003'
    ERR_NO_MOVIE_INFO_PROVIDED_FOR_CREATION = 'CAE0004'
    ERR_NO_MOVIE_FOUND_BY_GIVEN_ID = 'CAE0005'
    ERR_EXISTING_SHOW_FOUND = 'CAE0006'
    ERR_NO_HEADERS_FOUND = 'CAE0007'
    ERR_MALFORMED_HEADER = 'CAE0008'
    ERR_PERMISSIONS_NOT_INCLUDED = 'CAE0009'
    ERR_UNAUTHORIZED_ACTION = 'CAE0010'
    ERR_EXPIRED_TOKEN = 'CAE0011'
    ERR_INVALID_CLAIMS = 'CAE0012'
    ERR_FAILED_PARSING_AUTHENTICATION_TOKEN = 'CAE0013'
    ERR_NO_APPROPRIATE_KEY_FOUND = 'CAE0014'
    ERR_NO_CAST_TEAM_INFO_PROVIDED = 'CAE0015'
    ERR_NO_REQUEST_DATA_PROVIDED = 'CAE0016'

class ErrorMessages(Enum):
    ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE = '''
        Cannot delete actor or movie due to existing shows
    '''
    ERR_NO_ACTOR_FOUND_BY_GIVEN_ID = 'No actor is found for id'
    ERR_NO_ACTOR_PROVIDED_FOR_CREATION = '''
        No actor info is provided for creation or update
    '''
    ERR_NO_MOVIE_INFO_PROVIDED_FOR_CREATION = '''
        No movie info is provided for creation or update
    '''
    ERR_NO_MOVIE_FOUND_BY_GIVEN_ID = 'No movie is found for id'
    ERR_EXISTING_SHOW_FOUND = 'Existing show found'
    ERR_NO_HEADERS_FOUND = 'No header is present'
    ERR_MALFORMED_HEADER = 'The header is malformed'
    ERR_PERMISSIONS_NOT_INCLUDED = ''' 
        Permissions are not included in the payload 
    '''
    ERR_UNAUTHORIZED_ACTION = 'Action is not authorized'
    ERR_EXPIRED_TOKEN = 'Token expired'
    ERR_INVALID_CLAIMS= ''' 
        Incorrect claims. Please, check the audience and issuer 
    '''
    ERR_FAILED_PARSING_AUTHENTICATION_TOKEN = ''' 
        Unable to parse authentication token
    '''
    ERR_NO_APPROPRIATE_KEY_FOUND = '''
        Unable to find the appropriate key
    '''
    ERR_NO_CAST_TEAM_INFO_PROVIDED = '''
        No cast team info is provided
    '''
    ERR_NO_REQUEST_DATA_PROVIDED = 'No request data is provided'
