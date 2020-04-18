import instance from './shared';

const getAllActors = async () => {
    return await instance.get('/actors', {});
}

const saveNewActor = async (actor) => {
    return await instance.post('/actors', actor);
}

const deleteActor = async (actorId) => {
    return await instance.delete(`/actors/${actorId}`, {});
}

const updateActor = async (actorId, actor) => {
    return await instance.patch(`/actors/${actorId}`, actor);
}

const getActorDetails = async (actorId) => {
    return await instance.get(`/actors/${actorId}`, {});
}

const getActorsByMovie = async (movieId) => {
    return await instance.get(`/movies/${movieId}/actors`, {});
}

export default {
    getAllActors,
    saveNewActor,
    deleteActor,
    updateActor,
    getActorDetails,
    getActorsByMovie
}