import { actionContants } from '../utils/constants';
import ShowsAPI from '../api/ShowsAPI';

const updateCastTeamByMovieAction = ({actors, movies}) => {
    return {
        type: actionContants.UPDATE_CAST_TEAM_BY_MOVIE,
        actors,
        movies
    };
}

export const handleUpdateCastTeamByMovie = (movieId, requestObj) => {
    return (dispatch) => {
        return ShowsAPI.updateCastTeamByMovie(movieId, requestObj)
        .then(res => {
            dispatch(updateCastTeamByMovieAction({
                actors: res.data.actors,
                movies: res.data.movies
            }))
        })
    }
}