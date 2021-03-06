import { actionContants } from '../utils/constants';
import ActorsAPI from '../api/ActorsAPI';

const addActorAction = (actor) => {
    return {
        type: actionContants.ADD_ACTOR,
        actor
    }
}

const removeActorAction = (actorId) => {
    return {
        type: actionContants.DELETE_ACTOR,
        actorId
    }
}

const updateActorAction = (actor) => {
    return {
        type: actionContants.UPDATE_ACTOR,
        actor
    };
}

const getAllActorsAction = (actors) => {
    return {
        type: actionContants.GET_ALL_ACTORS,
        actors
    };
}

const getActorDetailsAction = (actor) => {
    return {
        type: actionContants.GET_ACTOR_DETAILS,
        actor
    };
}

export const handleGetAllActors = () => {
    return (dispatch) => {
        return ActorsAPI.getAllActors()
        .then(res => dispatch(getAllActorsAction(res.data.actors)));
    };
}

export const handleGetActorDetails = (actorId) => {
    return (dispatch) => {
        return ActorsAPI.getActorDetails(actorId)
        .then(res => dispatch(getActorDetailsAction(res.data.actor)))
    }
}

export const handleSaveActor = (actor) => {
    return (dispatch) => {
        return ActorsAPI.saveNewActor(actor)
        .then(res => dispatch(addActorAction(res.data.actor)));
    };
}

export const handleUpdateActor = (actorId, actor) => {
    return (dispatch) => {
        return ActorsAPI.updateActor(actorId, actor)
        .then(res => dispatch(updateActorAction(res.data.actor)));
    };
}

export const handleDeleteActor = (actorId) => {
    return (dispatch) => {
        return ActorsAPI.deleteActor(actorId)
        .then(res => dispatch(removeActorAction(res.data.actorId)));
    };
}