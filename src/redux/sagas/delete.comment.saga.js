import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* deleteCommentSaga(){
    yield takeEvery('DELETE_COMMENT', deleteComment);
}

function* deleteComment(action){
    // deletes a comment from the db
    // action.payload is comment_id and area_id
    try{
        yield axios.delete(`/api/comments/comment/${action.payload.comment_id}`);
        // run saga that gets all this area's comments to show the new one
        yield put({type: 'FETCH_COMMENTS', payload: action.payload.area_id});
    } catch(err) {
        console.log('get all areas error', err);
    }
}

export default deleteCommentSaga;