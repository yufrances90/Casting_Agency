import enum

from sqlalchemy import \
    Column, \
    String, \
    Integer, \
    DateTime, \
    Enum, \
    create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate(db=db)

def setup_db(app):
    db.app = app
    db.init_app(app)
    migrate.init_app(app)

class Gender(enum.Enum):
    female = 'F'
    male = 'M'

class Movie(db.Model):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable = False)
    release_date = Column(DateTime)

class Actor(db.Model):
    __tablename__ = 'actors'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(Enum(Gender))