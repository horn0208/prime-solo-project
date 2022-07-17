import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* myCommentSaga(){
    yield takeEvery('FETCH_MY_COMMENT', fetchMyComment);
}

function* fetchMyComment(action){
    // gets a comment from the db
    // action.payload is comment_id and history
    try{
        const comment = yield axios.get(`/api/comments/comment/${action.payload.comment_id}`);
        console.log('get my comment:', comment.data)
        // send this comment to reducer
        yield put({type: 'SET_MY_COMMENT', payload: comment.data});
        // then push to edit comment view
        
    } catch(err) {
        console.log('get all areas error', err);
    }
}

export default myCommentSaga;