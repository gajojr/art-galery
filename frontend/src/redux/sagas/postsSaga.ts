import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types';

import { PostInterface } from '../../components/ViewerProfilePageComponents/PostInteface';

async function getApi(category: string, filterBy: string) {
    try {
        const response = await axios.get(`/posts?category=${category}&filterBy=${filterBy}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

function* fetchPosts(action: { type: string; category: string; filterBy: string; }) {
    try {
        const { category, filterBy } = action;
        const posts: Promise<PostInterface> = yield call(getApi, category, filterBy);
        yield put({ type: types.GET_POSTS_SUCCESS, posts });
    } catch (err: any) {
        yield put({ type: types.GET_POSTS_FAILED, message: err.message });
        console.log(err);
    }
}

function* postsSaga() {
    yield takeEvery(types.GET_POSTS_REQUESTED, fetchPosts);
}

export default postsSaga;