import os

from dotenv import load_dotenv
from authlib.integrations.flask_client import OAuth

APP_ROOT = os.path.join(os.path.dirname(__file__), '..')
dotenv_path = os.path.join(APP_ROOT, 'env.sh')
load_dotenv(dotenv_path)


class Config(object):
    pass


class DevConfig(Config):

    dname = 'casting_agency_db'
    username = 'beijiayu'
    port = 5432

    SQLALCHEMY_DATABASE_URI = f'postgres://{username}@localhost:{port}/{dname}'
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = os.getenv('SECRET_KEY')

    # Auth0 credentials
    AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN')
    AUTH0_DOMAIN_I = os.getenv('AUTH0_DOMAIN_I')
    AUTH0_CLIENT_ID = os.getenv('AUTH0_CLIENT_ID')
    AUTH0_CLENT_SECRET = os.getenv('AUTH0_CLENT_SECRET')
    AUTH0_AUDIENCE = os.getenv('AUTH0_AUDIENCE')
    ALGORITHMS = [os.getenv('AUTH0_ALGORITHM')]

    @staticmethod
    def configure_auth0(app):

        oauth = OAuth(app)

        auth0 = oauth.register(
            'auth0',
            client_id=DevConfig.AUTH0_CLIENT_ID,
            client_secret=DevConfig.AUTH0_CLENT_SECRET,
            api_base_url=DevConfig.AUTH0_DOMAIN,
            access_token_url=f'{DevConfig.AUTH0_DOMAIN}/auth/token',
            authorize_url=f'{DevConfig.AUTH0_DOMAIN}/authorize',
            client_kwargs={
                'scope': 'openid profile email',
            },
        )

        return auth0

    @staticmethod
    def get_auth0_credentials():
        return {
            'domain': DevConfig.AUTH0_DOMAIN_I,
            'audience': DevConfig.AUTH0_AUDIENCE,
            'algorithms': DevConfig.ALGORITHMS
        }
