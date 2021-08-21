import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types';

async function getApi(postId: number) {
    try {
        const response = await axios.get(`/user-posts/${postId}`,
            {
                responseType: 'arraybuffer'
            }
        );

        const base64 = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
            ),
        );

        return `data:;base64,${base64}`;
    } catch (err) {
        console.log(err);
    }
}

function* fetchImage(action: { type: string; postId: number }) {
    try {
        const imageUrl: Promise<string> = yield call(getApi, action.postId);
        yield put({ type: types.GET_IMAGE_SUCCESS, imageUrl });
    } catch (err: any) {
        yield put({ type: types.GET_IMAGE_FAILED, message: err.message });
        console.log(err);
    }
}

function* imageSaga() {
    yield takeEvery(types.GET_IMAGE_REQUESTED, fetchImage);
}

export default imageSaga;