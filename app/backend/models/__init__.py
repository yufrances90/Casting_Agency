from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate(db=db)

def setup_db(app):
    db.app = app
    db.init_app(app)
    migrate.init_app(app)

class Movie(db.Model):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True)