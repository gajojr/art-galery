import * as types from '../types';

const initialState = {
    imageUrl: '',
    loading: false,
    error: null
}

export default function images(state = initialState, action: any) {
    switch (action.type) {
        case types.GET_IMAGE_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case types.GET_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                imageUrl: action.imageUrl
            };
        case types.GET_IMAGE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            };
        default:
            return state;
    }
}

