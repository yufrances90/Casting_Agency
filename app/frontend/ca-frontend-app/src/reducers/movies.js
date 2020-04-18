import { actionContants } from '../utils/constants';

const initialState = {
    list: [],
    movie: null
}

const movies = (state = initialState, action) => {
    switch(action.type) {
        case actionContants.ADD_MOVIE:
            return {
                ...state,
                movie: action.movie,
                list: state.list.concat([action.movie])
            };
        case actionContants.DELETE_MOVIE:
            return {
                ...state,
                movie: null,
                list: state.list.filter(movie => movie.id !== action.movieId)
            };
        case actionContants.GET_MOVIE_DETAILS:
            return {
                ...state,
                movie: action.movie
            };
        case actionContants.GET_ALL_MOVIES:
        case actionContants.UPDATE_CAST_TEAM_BY_MOVIE:
            return {
                ...state,
                list: [...action.movies]
            };
        case actionContants.UPDATE_MOVIE:
            return {
                ...state,
                movie: action.movie,
                list: state.list.filter(movie => movie.id !== action.movie.id).concat([action.movie])
            }
        case actionContants.EMPTY_MOVIE_LIST: 
            return {
                ...state,
                movie: null,
                list: []
            }
        default:
            return state;
    }
}

export default movies;