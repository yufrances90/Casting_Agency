import instance from './shared';

const getAllMovies = async () => {
    return await instance.get('/movies', {});
}

const saveNewMovie = async (movie) => {
    return await instance.post('/movies', movie);
}

const deleteMovie = async (movieId) => {
    return await instance.delete('/movies/' + movieId, {});
}

const updateMovie = async (movieId, movie) => {
    return await instance.patch('/movies/' + movieId, movie);
}

const getMovieDetails = async (movieId) => {
    return await instance.get('/movies/' + movieId, {});
}

export default {
    getAllMovies,
    saveNewMovie,
    deleteMovie,
    updateMovie,
    getMovieDetails
}