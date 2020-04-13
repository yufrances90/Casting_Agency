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
from error import ErrorCodes, CastingAgencyError, ErrorMessages


def get_formatted_actor_with_movies(actor):

    formatted_actor = actor.format()

    movies = get_movies_by_actor(actor.id)

    formatted_movies = get_formatted_movies(movies)

    formatted_actor['movies'] = formatted_movies

    return formatted_actor

def get_formatted_actor_list():

    actors = Actor.query.all()

    return [get_formatted_actor_with_movies(actor) for actor in actors]


def save_actor(request_data):

    actor_info = get_actor_info_from_request_data(request_data)

    actor = Actor(
        name=actor_info['name'], 
        age=actor_info['age'], 
        gender=actor_info['gender']
    )

    actor.insert()

    return actor.format()

def delete_actor_by_id(actor_id):

    if (check_if_movie_or_actor_is_bounded(actor_id=actor_id, movie_id=None)):
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE.value,
            message=ErrorMessages.ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE.value,
            status_code=400
            )

    actor = Actor.query.filter_by(id=actor_id).one_or_none()

    if actor is None:

        msg = f'{ErrorMessages.ERR_NO_ACTOR_FOUND_BY_GIVEN_ID.value} {actor_id}'

        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_NO_ACTOR_FOUND_BY_GIVEN_ID.value,
            message=msg,
            status_code=400
            )

    actor.delete()

    return actor_id

def update_actor_by_id(actor_id, request_data):

    actor = get_actor_by_actor_id(actor_id)

    actor_info = get_actor_info_from_request_data(request_data)

    actor.name = actor_info['name']
    actor.age = actor_info['age']
    actor.gender = actor_info['gender']

    actor.update()

    return get_formatted_actor_with_movies(actor)

def get_actor_by_id(actor_id):

    actor = get_actor_by_actor_id(actor_id)

    return get_formatted_actor_with_movies(actor)

    
def get_actor_info_from_request_data(request_data):

    if len(request_data) == 0:
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_NO_ACTOR_PROVIDED_FOR_CREATION.value,
            message=ErrorMessages.ERR_NO_ACTOR_PROVIDED_FOR_CREATION.value,
            status_code=400
        )

    name = request_data['name']
    age = request_data['age']
    gender = get_gender_enum_value_by_string(request_data['gender'])

    return {
        'name': name,
        'age': age,
        'gender': gender
    }

def get_actor_by_actor_id(actor_id):

    actor = Actor.query.filter_by(id=actor_id).one_or_none()

    if actor is None:

        msg = f'{ErrorMessages.ERR_NO_ACTOR_FOUND_BY_GIVEN_ID.value} {actor_id}'

        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_NO_ACTOR_FOUND_BY_GIVEN_ID.value,
            message=msg,
            status_code=404
            )

    return actor
    
def get_gender_enum_value_by_string(genderStr):
    return Gender.female if genderStr == 'F' else Gender.male

def get_formatted_movies(movies):
    return [movie.format() for movie in movies]