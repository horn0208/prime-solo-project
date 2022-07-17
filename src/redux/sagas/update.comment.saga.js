import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* updateCommentSaga(){
    yield takeEvery('UPDATE_COMMENT', updateComment);
}

function* updateComment(action){
    // updates a comment from the db
    // action.payload is date, comment, comment_id, user_id, area_id, history
    console.log('in update comment:', action.payload);
    let passed = action.payload
    try{
        yield axios.put(`/api/comments/comment/${passed.comment_id}`, passed);
        // run saga that gets all this area's comments to show the updates
        yield put({type: 'FETCH_COMMENTS', payload: passed.area_id});
        // move to Area Details view using history
        passed.history.push(`/area/${passed.area}/${passed.area_id}`);
    } catch(err) {
        console.log('get all areas error', err);
    }
}

export default updateCommentSaga;