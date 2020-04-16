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

from models import setup_db, Gender
from error import CastingAgencyError
from utils.helpers import \
    get_formatted_actor_list, \
    save_actor, \
    delete_actor_by_id, \
    update_actor_by_id, \
    get_actor_by_id, \
    get_formatted_movie_list, \
    save_movie, \
    delete_movie_by_id, \
    update_movie_by_id, \
    get_movie_by_id, \
    add_new_show, \
    delete_show, \
    get_actors_by_movie_id, \
    get_formatted_movie_only_list
from auth import requires_auth


app = Flask(__name__)
app.config.from_object('config.DevConfig')
setup_db(app)
CORS(app)


@app.after_request
def after_request(response):
    response.headers.add(
        'Access-Control-Allow-Headers', 'Content-Type,Authorization,true'
    )
    response.headers.add(
        'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'
    )
    return response


@app.route('/')
def index():
    return jsonify({
        'msg': 'Wecome to Casting Agency API',
        'success': True
    })


''' ACTORS '''


@app.route('/actors', methods=['GET'])
@requires_auth(permission='get:actors')
def get_all_actors(permission):

    return jsonify({
        'success': True,
        'actors': get_formatted_actor_list()
    })


@app.route('/actors', methods=['POST'])
@requires_auth(permission='post:actors')
def create_new_actor(permission):

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'actor': save_actor(request_data)
    })


@app.route('/actors/<int:actor_id>', methods=['DELETE'])
@requires_auth(permission='delete:actors')
def delete_actor(permission, actor_id):

    return jsonify({
        'success': True,
        'actorId': delete_actor_by_id(actor_id)
    })


@app.route('/actors/<int:actor_id>', methods=['PATCH'])
@requires_auth(permission='patch:actors')
def update_actor(permission, actor_id):

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'actor': update_actor_by_id(actor_id, request_data)
    })


@app.route('/actors/<int:actor_id>', methods=['GET'])
@requires_auth(permission='get:actors')
def get_actor(permission, actor_id):

    return jsonify({
        'success': True,
        'actor': get_actor_by_id(actor_id)
    })


@app.route('/movies/<int:movie_id>/actors', methods=['GET'])
@requires_auth(permission='get:actors')
def get_actors_by_movie(permission, movie_id):

    return jsonify({
        'success': True,
        'actors': get_actors_by_movie_id(movie_id)
    })


''' MOVIES '''


@app.route('/movies', methods=['GET'])
@requires_auth(permission='get:movies')
def get_all_movies(permission):

    is_actors_only = request.args.get("isMovieOnly") == 'true'

    return jsonify({
        'success': True,
        'movies': get_formatted_movie_only_list() if is_actors_only
        else get_formatted_movie_list()
    })


@app.route('/movies', methods=['POST'])
@requires_auth(permission='post:movies')
def create_new_movie(permission):

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'movie': save_movie(request_data)
    })


@app.route('/movies/<int:movie_id>', methods=['DELETE'])
@requires_auth(permission='delete:movies')
def delete_movie(permission, movie_id):

    return jsonify({
        'success': True,
        'movieId': delete_movie_by_id(movie_id)
    })


@app.route('/movies/<int:movie_id>', methods=['PATCH'])
@requires_auth(permission='patch:movies')
def update_movie(permission, movie_id):

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'movie': update_movie_by_id(movie_id, request_data)
    })


@app.route('/movies/<int:movie_id>', methods=['GET'])
@requires_auth(permission='get:movies')
def get_movie(permission, movie_id):

    return jsonify({
        'success': True,
        'movie': get_movie_by_id(movie_id)
    })


''' SHOWS '''


@app.route('/shows', methods=['POST'])
@requires_auth(permission='post:actors')
def save_new_show(permission):

    request_data = json.loads(request.data)

    add_new_show(request_data)

    return jsonify({
        'success': True,
        'actors': get_formatted_actor_list(),
        'movies': get_formatted_movie_list()
    })


@app.route('/shows', methods=['DELETE'])
@requires_auth(permission='delete:actors')
def delete_shows(permission):

    request_data = json.loads(request.data)

    delete_show(request_data)

    return jsonify({
        'success': True,
        'actors': get_formatted_actor_list(),
        'movies': get_formatted_movie_list()
    })


''' ERROR HANDLING '''


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


'''
error handler for CastingAgencyError
'''
@app.errorhandler(CastingAgencyError)
def auth_error(error):

    return jsonify({
        "success": False,
        "message": f'{error.error_code}: {error.message}'
    }), error.status_code


if __name__ == "__main__":
    app.run()
