from enum import Enum

class CastingAgencyError(Exception):

    def __init__(self, error_code, status_code, message=''):

        self.error_code = error_code
        self.status_code = status_code
        self.message = message


class ErrorCodes(Enum):
    ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE = 'CAE0001'
    ERR_NO_ACTOR_FOUND_BY_GIVEN_ID = 'CAE0002'
    ERR_NO_ACTOR_PROVIDED_FOR_CREATION = 'CAE0003'
    ERR_NO_MOVIE_INFO_PROVIDED_FOR_CREATION = 'CAE0004'
    ERR_NO_MOVIE_FOUND_BY_GIVEN_ID = 'CAE0005'
    ERR_EXISTING_SHOW_FOUND = 'CAE0006'

class ErrorMessages(Enum):
    ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE = 'Cannot delete actor or movie due to existing shows'
    ERR_NO_ACTOR_FOUND_BY_GIVEN_ID = 'No actor is found for id'
    ERR_NO_ACTOR_PROVIDED_FOR_CREATION = 'No actor info is provided for creation or update'
    ERR_NO_MOVIE_INFO_PROVIDED_FOR_CREATION = 'No movie info is provided for creation or update'
    ERR_NO_MOVIE_FOUND_BY_GIVEN_ID = 'No movie is found for id'
    ERR_EXISTING_SHOW_FOUND = 'Existing show found'
