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
    delete_show


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

    return jsonify({
        'success': True,
        'actors': get_formatted_actor_list()
    })


@app.route('/actors', methods=['POST'])
def create_new_actor():

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'actor': save_actor(request_data)
    })


@app.route('/actors/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):

    return jsonify({
        'success': True,
        'actorId': delete_actor_by_id(actor_id)
    })

@app.route('/actors/<int:actor_id>', methods=['PATCH'])
def update_actor(actor_id):

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'actor': update_actor_by_id(actor_id, request_data)
    })


@app.route('/actors/<int:actor_id>', methods=['GET'])
def get_actor(actor_id):

    return jsonify({
        'success': True,
        'actor': get_actor_by_id(actor_id)
    })


''' MOVIES '''


@app.route('/movies', methods=['GET'])
def get_all_movies():

    return jsonify({
        'success': True,
        'movies': get_formatted_movie_list()
    })


@app.route('/movies', methods=['POST'])
def create_new_movie():

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'movie': save_movie(request_data)
    })


@app.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):

    return jsonify({
        'success': True,
        'movieId': delete_movie_by_id(movie_id)
    })


@app.route('/movies/<int:movie_id>', methods=['PATCH'])
def update_movie(movie_id):

    request_data = json.loads(request.data)

    return jsonify({
        'success': True,
        'movie': update_movie_by_id(movie_id, request_data)
    })


@app.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):

    return jsonify({
        'success': True,
        'movie': get_movie_by_id(movie_id)
    })


''' SHOWS '''


@app.route('/shows', methods=['POST'])
def save_new_show():

    request_data = json.loads(request.data)

    add_new_show(request_data)

    return jsonify({
        'success': True
    })


@app.route('/shows', methods=['DELETE'])
def delete_shows():

    request_data = json.loads(request.data)

    delete_show(request_data)

    return jsonify({
        'success': True
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
