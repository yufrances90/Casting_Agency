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


def save_actor(name, age, gender):

    actor = Actor(name=name, age=age, gender=gender)

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

def get_formatted_movies(movies):
    return [movie.format() for movie in movies]