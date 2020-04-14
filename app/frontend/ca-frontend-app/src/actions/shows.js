import { actionContants } from '../utils/constants';
import ShowsAPI from '../api/ShowsAPI';

const assignActorToMovieAction = ({actors, movies}) => {
    return {
        type: actionContants.ASSIGN_ACTOR_TO_MOVIE,
        actors,
        movies
    }
}

const unlinkActorFromMovieAction = ({actors, movies}) => {
    return {
        type: actionContants.UNLINK_ACTOR_FROM_MOVIE,
        actors,
        movies
    }
}

const handleAssignActorToMovie = (show) => {
    return (dispatch) => {
        return ShowsAPI.assignActorToMovie(show)
        .then(res => {
            dispatch(assignActorToMovieAction({
                actors: res.actors,
                movies: res.movies
            }))
        })
    }
}

const handleUnlinkActorFromMovie = (show) => {
    return (dispatch) => {
        return ShowsAPI.unlinkActorFromMovie(show)
        .then(res => {
            dispatch(unlinkActorFromMovieAction({
                actors: res.actors,
                movies: res.movies
            }))
        })
    }
}

export default {
    handleAssignActorToMovie,
    handleUnlinkActorFromMovie
}