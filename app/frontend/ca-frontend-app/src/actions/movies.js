import { actionContants } from '../utils/constants';
import MoviesAPI from '../api/MoviesAPI';

const addMovieAction = (movie) => {
    return {
        type: actionContants.ADD_MOVIE,
        movie
    };
}

const removeMovieAction = (id) => {
    return {
        type: actionContants.UPDATE_MOVIE,
        id
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

const handleGetAllMovies = () => {
    return (dispatch) => {
        return MoviesAPI.getAllMovies()
        .then(res => dispatch(getAllMoviesAction(res.movies)));
    };
}

const handleGetMovieDetails = (movieId) => {
    return (dispatch) => {
        return MoviesAPI.getMovieDetails(movieId)
        .then(res => dispatch(getMovieDetailsAction(res.movie)));
    };
}

const handleSaveMovie = (movie) => {
    return (dispatch) => {
        return MoviesAPI.saveNewMovie(movie)
        .then(res => dispatch(addMovieAction(res.movie)));
    };
}

const handleUpdateMovie = (movieId, movie) => {
    return (dispatch) => {
        return MoviesAPI.updateMovie(movieId, movie)
        .then(res => dispatch(updateMovieAction(res.movie)));
    };
}

const handleDeleteMovie = (movieId) => {
    return (dispatch) => {
        return MoviesAPI.deleteMovie(movieId)
        .then(res => dispatch(removeMovieAction(res.movieId)));
    };
}

export default {
    handleGetAllMovies,
    handleGetMovieDetails,
    handleSaveMovie,
    handleUpdateMovie,
    handleDeleteMovie
}