'''
app.py
Author: Frances Yu
'''

import json
import datetime

from flask import \
    Flask, \
    jsonify, \
    request, \
    abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from models import setup_db, Actor, Movie, Gender


app = Flask(__name__)
app.config.from_object('config.DevConfig')
setup_db(app)
CORS(app)


@app.route('/')
def index():
    return jsonify({
        'msg': 'Wecome to Casting Agency API'
    })

@app.route('/actors', methods=['GET'])
def get_all_actors():

    res =  Actor.query.all()

    return jsonify( {
        'success': True,
        'actors': [actor.format() for actor in res]
    })

@app.route('/movies', methods=['GET'])
def get_all_movies():

    res = Movie.query.all()

    return jsonify( {
        'success': True,
        'movies': [movie.format() for movie in res]
    }) 

@app.route('/actors', methods=['POST'])
def create_new_actor():

    request_data = json.loads(request.data)

    name = request_data['name']
    age = request_data['age']
    gender = Gender.female if request_data['gender'] == 'F' else Gender.male

    actor = Actor(name=name, age=age, gender=gender)

    actor.insert()

    return jsonify({
        'success': True
    })


@app.route('/movies', methods=['POST'])
def create_new_movie():

    request_data = json.loads(request.data)

    title = request_data['title']
    release_date = request_data['release_date']

    movie = Movie(
        title=title, 
        release_date=datetime.datetime.strptime(release_date, '%Y-%m-%d %H:%M:%S')
    )

    movie.insert()

    return jsonify({
        'success': True
    })


if __name__ == "__main__":
    app.run()
