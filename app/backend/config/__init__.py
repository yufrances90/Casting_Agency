from flask_sqlalchemy import SQLAlchemy


class Config(object):
    pass


class DevConfig(Config):

    dname = 'casting_agency_db'
    username = 'beijiayu'
    port = 5432

    SQLALCHEMY_DATABASE_URI = f'postgres://{username}@localhost:{port}/{dname}'
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
