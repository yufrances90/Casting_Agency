import datetime

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


''' ACTORS '''


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
        gender=actor_info['gender'],
        image_link=actor_info['image_link']
    )

    actor.insert()

    return actor.format()


def delete_actor_by_id(actor_id):

    raise_exception_if_link_btw_actor_and_movie_exists(
        actor_id=actor_id,
        movie_id=None
    )

    actor = get_actor_by_actor_id(actor_id)

    actor.delete()

    return actor_id


def update_actor_by_id(actor_id, request_data):

    actor = get_actor_by_actor_id(actor_id)

    actor_info = get_actor_info_from_request_data(request_data)

    actor.name = actor_info['name']
    actor.age = actor_info['age']
    actor.gender = actor_info['gender']
    actor.image_link = actor_info['image_link']

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
    image_link = request_data['image_link']

    return {
        'name': name,
        'age': age,
        'gender': gender,
        'image_link': image_link
    }


def get_actor_by_actor_id(actor_id):

    actor = Actor.query.filter_by(id=actor_id).one_or_none()

    if actor is None:

        msg = '{} {}'.format(
            ErrorMessages.ERR_NO_ACTOR_FOUND_BY_GIVEN_ID.value,
            actor_id
        )

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


''' MOVIES '''


def get_formatted_movie_with_actors(movie):

    actors = get_actors_by_movie(movie.id)

    formatted_actors = [actor.format() for actor in actors]

    formatted_movie = movie.format()

    formatted_movie['actors'] = formatted_actors

    return formatted_movie


def get_formatted_movie_list():

    movies = Movie.query.all()

    return [get_formatted_movie_with_actors(movie) for movie in movies]


def save_movie(request_data):

    movie_info = get_movie_info_from_request_data(request_data)

    title = movie_info['title']
    release_date = movie_info['release_date']
    image_link = movie_info['image_link']

    movie = Movie(title=title, release_date=release_date, image_link=image_link)

    movie.insert()

    return movie.format()


def delete_movie_by_id(movie_id):

    raise_exception_if_link_btw_actor_and_movie_exists(
        actor_id=None,
        movie_id=movie_id
    )

    movie = get_movie_by_movie_id(movie_id)

    movie.delete()

    return movie_id


def update_movie_by_id(movie_id, request_data):

    movie = get_movie_by_movie_id(movie_id)

    movie_info = get_movie_info_from_request_data(request_data)

    movie.title = movie_info['title']
    movie.release_date = movie_info['release_date']
    movie.image_link = movie_info['image_link']

    movie.update()

    return get_formatted_movie_with_actors(movie)


def get_movie_by_id(movie_id):

    movie = get_movie_by_movie_id(movie_id)

    return get_formatted_movie_with_actors(movie)


def get_movie_by_movie_id(movie_id):

    movie = Movie.query.filter_by(id=movie_id).one_or_none()

    if movie is None:

        msg = '{} {}'.format(
            ErrorMessages.ERR_NO_MOVIE_FOUND_BY_GIVEN_ID.value,
            movie_id
        )

        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_NO_MOVIE_FOUND_BY_GIVEN_ID.value,
            message=msg,
            status_code=404
        )

    return movie


def get_movie_info_from_request_data(request_data):

    if len(request_data) == 0:
        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_NO_MOVIE_INFO_PROVIDED_FOR_CREATION
            .value,
            message=ErrorMessages.ERR_NO_MOVIE_INFO_PROVIDED_FOR_CREATION
            .value,
            status_code=400
        )

    title = request_data['title']
    release_date = stringToDate(request_data['release_date'])
    image_link = request_data['image_link']

    return {
        'title': title,
        'release_date': release_date,
        'image_link': image_link
    }


def stringToDate(stringDate):
    return datetime.datetime.strptime(stringDate, '%Y-%m-%d')


''' SHOWS '''


def add_new_show(request_data):

    actor_id = request_data['actor_id']
    movie_id = request_data['movie_id']

    show = get_show_by_movie_and_actor(movie_id, actor_id)

    if show is not None:

        msg = '{} with movie id {} and actor id {}'.format(
            ErrorMessages.ERR_EXISTING_SHOW_FOUND.value,
            movie_id,
            actor_id
        )

        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_EXISTING_SHOW_FOUND.value,
            message=msg,
            status_code=422
        )

    show = Show(actor_id=actor_id, movie_id=movie_id)

    show.insert()


def delete_show(request_data):

    actor_id = request_data['actor_id']
    movie_id = request_data['movie_id']

    delete_show(movie_id, actor_id)


''' SHARED '''


def raise_exception_if_link_btw_actor_and_movie_exists(actor_id, movie_id):

    if (
        check_if_movie_or_actor_is_bounded(
            actor_id=actor_id, movie_id=movie_id)):

        raise CastingAgencyError(
            error_code=ErrorCodes.ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE.value,
            message=ErrorMessages.ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE.value,
            status_code=422
            )

def get_actors_by_movie_id(movie_id):

    actors = get_actors_by_movie(movie_id)

    return [actor.format() for actor in actors]
