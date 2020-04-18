import { actionContants } from '../utils/constants';

const initialState = {
    list: [],
    actor: null
}

const actors = (state = initialState, action) => {
    switch(action.type) {
        case actionContants.ADD_ACTOR:
            return {
                ...state,
                actor: action.actor,
                list: state.list.concat([action.actor])
            };
        case actionContants.DELETE_ACTOR:
            return {
                ...state,
                actor: null,
                list: state.list.filter(actor => actor.id !== action.actorId)
            };
        case actionContants.GET_ACTOR_DETAILS:
            return {
                ...state,
                actor: action.actor
            };
        case actionContants.GET_ALL_ACTORS:
        case actionContants.UPDATE_CAST_TEAM_BY_MOVIE:
            return {
                ...state,
                list: [...action.actors]
            };
        case actionContants.UPDATE_ACTOR:
            return {
                ...state,
                actor: action.actor,
                list: state.list.filter(actor => actor.id !== action.actor.id).concat([action.actor])
            }
        case actionContants.EMPTY_ACTOR_LIST: 
            return {
                ...state,
                actor: null,
                list: []
            }
        default:
            return state;
    }
}

export default actors;