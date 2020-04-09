from flask_sqlalchemy import SQLAlchemy

class Config(object):
    pass 

class DatabaseConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'postgres://beijiayu@localhost:5432/casting_agency_db'
