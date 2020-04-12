import { actionContants } from '../utils/constants';

const assignActorToMovieAction = (show) => {
    return {
        type: actionContants.ASSIGN_ACTOR_TO_MOVIE,
        show
    }
}

const unlinkActorFromMovieAction = (show) => {
    return {
        type: actionContants.UNLINK_ACTOR_FROM_MOVIE,
        show
    }
}

export default {
    assignActorToMovieAction,
    unlinkActorFromMovieAction
}