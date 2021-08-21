import { combineReducers } from 'redux';
import posts from './posts';
import images from './images';

const rootReducer = combineReducers({
    posts,
    images
});

export default rootReducer;