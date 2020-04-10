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
        'data': [actor.format() for actor in res]
    })

@app.route('/movies', methods=['GET'])
def get_all_movies():

    res = Movie.query.all()

    return jsonify( {
        'success': True,
        'data': [movie.format() for movie in res]
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

@app.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):

    movie = Movie.query.filter_by(id = movie_id).one_or_none()

    if movie is None:
        abort(404, description=f'No movie is found for id {movie_id}')

    movie.delete()

    return jsonify({
        'success': True
    })

@app.route('/actors/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):

    actor = Actor.query.filter_by(id = actor_id).one_or_none()

    if actor is None:
        abort(404, description=f'No actor is found for id {actor_id}')

    actor.delete()

    return jsonify({
        'success': True
    })

@app.route('/actors/<int:actor_id>', methods=['PATCH'])
def update_actor(actor_id):

    actor = Actor.query.filter_by(id = actor_id).one_or_none()

    if actor is None:
        abort(404, description=f'No actor is found for id {actor_id}')

    request_data = json.loads(request.data)

    name = request_data['name']
    age = request_data['age']
    gender = Gender.female if request_data['gender'] == 'F' else Gender.male

    actor.name = name
    actor.age = age
    actor.gender = gender

    actor.update()

    return jsonify({
        'success': True
    })

@app.route('/movies/<int:movie_id>', methods=['PATCH'])
def update_movie(movie_id):

    movie = Movie.query.filter_by(id = movie_id).one_or_none()

    if movie is None:
        abort(404, description=f'No movie is found for id {movie_id}')

    request_data = json.loads(request.data)

    title = request_data['title']
    release_date = request_data['release_date']

    movie.title = title
    movie.release_date = datetime.datetime.strptime(release_date, '%Y-%m-%d %H:%M:%S')

    movie.update()

    return jsonify({
        'success': True
    })

@app.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):

    movie = Movie.query.filter_by(id = movie_id).one_or_none()

    if movie is None:
        abort(404, description=f'No movie is found for id {movie_id}')

    return jsonify({
        'success': True,
        'data': movie.format()
    })


@app.route('/actors/<int:actor_id>', methods=['GET'])
def get_actor(actor_id):

    actor = Actor.query.filter_by(id = actor_id).one_or_none()

    if actor is None:
        abort(404, description=f'No actor is found for id {actor_id}')

    return jsonify({
        'success': True,
        'data': actor.format()
    })

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


if __name__ == "__main__":
    app.run()
