import enum
import json

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

def get_actors_by_movie(movie_id):
    return db.session.query(Actor).join(Show).join(
        Movie).filter(Movie.id == movie_id).all()

def get_movies_by_actor(actor_id):
    return db.session.query(Movie).join(Show).join(
        Actor).filter(Actor.id == actor_id).all()

def check_if_movie_or_actor_is_bounded(movie_id=None, actor_id=None):

    is_movie_exists = db.session.query(Show).filter(
        Show.movie_id == movie_id).count() > 0 if movie_id is not None else False

    is_actor_exists = db.session.query(Show).filter(
        Show.actor_id == actor_id).count() > 0 if actor_id is not None else False

    return is_movie_exists or is_actor_exists

class Gender(enum.Enum):
    female = 'F'
    male = 'M'


class Movie(db.Model):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    release_date = Column(DateTime)
    shows = db.relationship('Show', backref='movie', lazy=True)

    def __init__(self, title, release_date):
        self.title = title
        self.release_date = release_date

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'title': self.title,
            'release_date': self.release_date
        }


class Actor(db.Model):
    __tablename__ = 'actors'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(Enum(Gender))
    shows = db.relationship('Show', backref='actor', lazy=True)

    def __init__(self, name, age, gender):
        self.name = name
        self.age = age
        self.gender = gender

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender.value
        }

class Show(db.Model):
    __tablename__ = 'shows'
    id = Column(Integer, primary_key = True)
    movie_id = Column(Integer, db.ForeignKey('movies.id'), nullable = False)
    actor_id = Column(Integer, db.ForeignKey('actors.id'), nullable = False)

    def insert(self):
        db.session.add(self)
        db.session.commit()
