import * as types from '../types';

const initialState = {
    posts: [],
    loading: false,
    error: null
}

export default function posts(state = initialState, action: any) {
    switch (action.type) {
        case types.GET_POSTS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case types.GET_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.posts
            };
        case types.GET_POSTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            };
        default:
            return state;
    }
}

