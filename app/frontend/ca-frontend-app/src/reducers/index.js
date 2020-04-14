import { combineReducers } from 'redux';

import { loadingBarReducer } from 'react-redux-loading';

import movies from './movies';
import actors from './actors';

export default combineReducers({
    movies,
    actors,
    loadingBar: loadingBarReducer
})