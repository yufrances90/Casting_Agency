from flask_sqlalchemy import SQLAlchemy


class Config(object):
    pass


class DatabaseConfig(Config):

    dname = 'casting_agency_db'
    username = 'beijiayu'
    port = 5432

    SQLALCHEMY_DATABASE_URI = f'postgres://{username}@localhost:{port}/{dname}'
