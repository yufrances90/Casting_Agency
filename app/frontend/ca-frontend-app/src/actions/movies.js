import { actionContants } from '../utils/constants';
import MoviesAPI from '../api/MoviesAPI';

const addMovieAction = (movie) => {
    return {
        type: actionContants.ADD_MOVIE,
        movie
    };
}

const removeMovieAction = (movieId) => {
    return {
        type: actionContants.UPDATE_MOVIE,
        movieId
    };
}

const updateMovieAction = (movie) => {
    return {
        type: actionContants.UPDATE_MOVIE,
        movie
    };
}

const getAllMoviesAction = (movies) => {
    return {
        type: actionContants.GET_ALL_MOVIES,
        movies
    };
}

const getMovieDetailsAction = (movie) => {
    return {
        type: actionContants.GET_MOVIE_DETAILS,
        movie
    };
}

const emptyMovieListAction = (movies) => {
    return {
        type: actionContants.EMPTY_MOVIE_LIST,
        movies
    }
}

export const handleGetAllMovies = () => {
    return (dispatch) => {
        return MoviesAPI.getAllMovies()
        .then(res => {
            if (res && res.data) {
                dispatch(getAllMoviesAction(res.data.movies))
            }
        });
    };
}

export const handleClearMovieList = () => {
    return (dispatch) => {
        dispatch(emptyMovieListAction([]))
    };
}

export const handleGetMovieDetails = (movieId) => {
    return (dispatch) => {
        return MoviesAPI.getMovieDetails(movieId)
        .then(res => dispatch(getMovieDetailsAction(res.data.movie)));
    };
}

export const handleSaveMovie = (movie) => {
    return (dispatch) => {
        return MoviesAPI.saveNewMovie(movie)
        .then(res => dispatch(addMovieAction(res.data.movie)));
    };
}

export const handleUpdateMovie = (movieId, movie) => {
    return (dispatch) => {
        return MoviesAPI.updateMovie(movieId, movie)
        .then(res => dispatch(updateMovieAction(res.data.movie)));
    };
}

export const handleDeleteMovie = (movieId) => {
    return (dispatch) => {
        return MoviesAPI.deleteMovie(movieId)
        .then(res => dispatch(removeMovieAction(res.data.movieId)));
    };
}