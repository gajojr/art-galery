import { all } from 'redux-saga/effects';
import postsSaga from './postsSaga';
import imageSaga from './imageSaga';

export default function* rootSaga() {
    yield all([
        postsSaga(),
        imageSaga()
    ]);
}