import { combineReducers } from 'redux';
import posts from './posts';
import images from './images';
import profileImages from './profileImages';

const rootReducer = combineReducers({
    posts,
    images,
    profileImages
});

export default rootReducer;