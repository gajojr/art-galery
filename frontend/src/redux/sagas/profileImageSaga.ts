import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types';

async function getApi() {
    try {
        const response = await axios
            .get(
                `/get-avatar`,
                {
                    headers: {
                        'x-access-token': sessionStorage.getItem('token')
                    },
                    params: {
                        username: sessionStorage.getItem('username')
                    },
                    responseType: 'arraybuffer'
                }
            )

        if (response.headers['content-type'] === 'application/json; charset=utf-8') {
            sessionStorage.clear();
            window.location.href = '/';
            return;
        }

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

function* fetchProfileImage() {
    try {
        const imageUrl: Promise<string> = yield call(getApi);
        yield put({ type: types.GET_PROFILE_IMAGE_SUCCESS, imageUrl });
    } catch (err: any) {
        yield put({ type: types.GET_PROFILE_IMAGE_FAILED, message: err.message });
        console.log(err);
    }
}

function* profileImageSaga() {
    yield takeEvery(types.GET_PROFILE_IMAGE_REQUESTED, fetchProfileImage);
}

export default profileImageSaga;