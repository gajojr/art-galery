import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types';

async function getApi() {
    try {
        const response = await axios.get('/posts');
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

function* fetchPosts(action: any) {
    try {
        const posts: Promise<any> = yield call(getApi);
        yield put({ type: types.GET_POSTS_SUCCESS, posts });
    } catch (err: any) {
        yield put({ type: types.GET_POSTS_FAILED, message: err.message });
        console.log(err);
    }
}

function* userSaga() {
    yield takeEvery(types.GET_POSTS_REQUESTED, fetchPosts);
}

export default userSaga;