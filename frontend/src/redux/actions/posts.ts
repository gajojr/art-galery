import * as types from '../types';

export function getPosts(category = 'All', filterBy = 'Date') {
    return {
        type: types.GET_POSTS_REQUESTED,
        category,
        filterBy
    }
}

