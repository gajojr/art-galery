import * as types from '../types';

export function getImage(postId: number) {
    return {
        type: types.GET_IMAGE_REQUESTED,
        postId
    }
}