import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* commentsSaga(){
    yield takeEvery('FETCH_COMMENTS', fetchComments);
}

function* fetchComments(action){
    // get all comments for a given area from the DB
    // action.payload is area id (number)
    try{
        const comments = yield axios.get(`/api/comments/areacomments/${action.payload}`);
        console.log('get comments:', comments.data);
        // send comments to reducer
        // yield put({type: 'SET_COMMENTS', payload: comments.data});
    } catch(err) {
        console.log('get all areas error', err);
    }
}

export default commentsSaga;