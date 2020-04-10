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

from models import \
    setup_db, \
    Actor, \
    Movie, \
    Gender, \
    Show, \
    get_actors_by_movie, \
    get_movies_by_actor, \
    check_if_movie_or_actor_is_bounded, \
    delete_show, \
    get_show_by_movie_and_actor


app = Flask(__name__)
app.config.from_object('config.DevConfig')
setup_db(app)
CORS(app)


@app.route('/')
def index():
    return jsonify({
        'msg': 'Wecome to Casting Agency API',
        'success': True
    })


''' ACTORS '''


@app.route('/actors', methods=['GET'])
def get_all_actors():

    actors = Actor.query.all()

    formatted_actors = []

    for actor in actors:

        formatted_actor = actor.format()

        movies = get_movies_by_actor(actor.id)

        formatted_movies = [movie.format() for movie in movies]

        formatted_actor['movies'] = formatted_movies

        formatted_actors.append(formatted_actor)

    return jsonify({
        'success': True,
        'data': formatted_actors
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


@app.route('/actors/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):

    if (check_if_movie_or_actor_is_bounded(actor_id=actor_id)):
        return jsonify({
            'success': False,
            'msg': 'Cannot delete actor due to existing shows'
        })

    actor = Actor.query.filter_by(id=actor_id).one_or_none()

    if actor is None:
        abort(404, description=f'No actor is found for id {actor_id}')

    actor.delete()

    return jsonify({
        'success': True
    })


@app.route('/actors/<int:actor_id>', methods=['PATCH'])
def update_actor(actor_id):

    actor = Actor.query.filter_by(id=actor_id).one_or_none()

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


@app.route('/actors/<int:actor_id>', methods=['GET'])
def get_actor(actor_id):

    actor = Actor.query.filter_by(id=actor_id).one_or_none()

    if actor is None:
        abort(404, description=f'No actor is found for id {actor_id}')

    movies = get_movies_by_actor(actor_id)

    formatted_movies = [movie.format() for movie in movies]

    formatted_actor = actor.format()

    formatted_actor['movies'] = formatted_movies

    return jsonify({
        'success': True,
        'data': formatted_actor
    })


''' MOVIES '''


@app.route('/movies', methods=['GET'])
def get_all_movies():

    movies = Movie.query.all()

    formatted_movies = []

    for movie in movies:

        actors = get_actors_by_movie(movie.id)

        formatted_actors = [actor.format() for actor in actors]

        formatted_movie = movie.format()

        formatted_movie['actors'] = formatted_actors

        formatted_movies.append(formatted_movie)

    return jsonify({
        'success': True,
        'data': formatted_movies
    })


@app.route('/movies', methods=['POST'])
def create_new_movie():

    request_data = json.loads(request.data)

    title = request_data['title']
    release_date = request_data['release_date']

    movie = Movie(
        title=title,
        release_date=datetime.datetime.strptime(
            release_date, '%Y-%m-%d %H:%M:%S')
    )

    movie.insert()

    return jsonify({
        'success': True
    })


@app.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):

    if (check_if_movie_or_actor_is_bounded(movie_id=movie_id)):
        return jsonify({
            'success': False,
            'msg': 'Cannot delete movie due to existing shows'
        })

    movie = Movie.query.filter_by(id=movie_id).one_or_none()

    if movie is None:
        abort(404, description=f'No movie is found for id {movie_id}')

    movie.delete()

    return jsonify({
        'success': True
    })


@app.route('/movies/<int:movie_id>', methods=['PATCH'])
def update_movie(movie_id):

    movie = Movie.query.filter_by(id=movie_id).one_or_none()

    if movie is None:
        abort(404, description=f'No movie is found for id {movie_id}')

    request_data = json.loads(request.data)

    title = request_data['title']
    release_date = request_data['release_date']

    movie.title = title
    movie.release_date = datetime.datetime.strptime(
        release_date, '%Y-%m-%d %H:%M:%S')

    movie.update()

    return jsonify({
        'success': True
    })


@app.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):

    movie = Movie.query.filter_by(id=movie_id).one_or_none()

    if movie is None:
        abort(404, description=f'No movie is found for id {movie_id}')

    actors = get_actors_by_movie(movie_id)

    formatted_actors = [actor.format() for actor in actors]

    formatted_movie = movie.format()

    formatted_movie['actors'] = formatted_actors

    return jsonify({
        'success': True,
        'data': formatted_movie
    })


''' SHOWS '''


@app.route('/shows', methods=['POST'])
def save_new_show():

    request_data = json.loads(request.data)

    actor_id = request_data['actor_id']
    movie_id = request_data['movie_id']

    show = get_show_by_movie_and_actor(movie_id, actor_id)

    if show is not None:
        return jsonify({
            'success': False,
            'msg': 'Cannot add new show due to existing shows'
        })

    show = Show(actor_id=actor_id, movie_id=movie_id)

    show.insert()

    return jsonify({
        'success': True
    })


@app.route('/shows', methods=['DELETE'])
def delete_shows():

    request_data = json.loads(request.data)

    actor_id = request_data['actor_id']
    movie_id = request_data['movie_id']

    delete_show(movie_id, actor_id)

    return jsonify({
        'success': True
    })


''' ERROR HANDLING '''


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


if __name__ == "__main__":
    app.run()
