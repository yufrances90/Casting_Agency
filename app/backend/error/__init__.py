from enum import Enum

class CastingAgencyError(Exception):

    def __init__(self, error_code, status_code, message=''):

        self.error_code = error_code
        self.status_code = status_code

        msg = f'{self.error_code}: {message}'
        
        self.message = msg


class ErrorCodes(Enum):
    ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE = 'CAE0001'
    ERR_NO_ACTOR_FOUND_BY_GIVEN_ID = 'CAE0002'

class ErrorMessages(Enum):
    ERR_EXISTS_LINK_BTW_ACTOR_AND_MOVIE = 'Cannot delete actor due to existing shows'
    ERR_NO_ACTOR_FOUND_BY_GIVEN_ID = 'No actor is found for id'
