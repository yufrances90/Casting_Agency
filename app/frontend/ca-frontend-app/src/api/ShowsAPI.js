import instance from './shared';

const updateCastTeamByMovie = async (movieId, requestObj) => {
    return await instance.put(`/movies/${movieId}/actors`, requestObj);
}

export default {
    updateCastTeamByMovie
}