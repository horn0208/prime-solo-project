import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* addCommentSaga(){
    yield takeEvery('POST_COMMENT', postComment);
}

function* postComment(action){
    // adds a comment to the database
    // action.payload: area_id, date, comment
    try{
        console.log('in postComment:', action.payload);
        // send comment to server
        yield axios.post(`/api/comments/comment`, action.payload);
        // run saga that gets all this area's comments to show the new one
        yield put({type: 'FETCH_COMMENTS', payload: action.payload.area_id});
    } catch(err) {
        console.log('get all areas error', err);
    }
}

export default addCommentSaga;