import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import allAreasSaga from './all.areas.saga';
import commentsSaga from './comments.saga';
import addCommentSaga from './add.comment.saga';
import deleteCommentSaga from './delete.comment.saga';
import myCommentSaga from './my.comment.saga';
import updateComment from './update.comment.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    allAreasSaga(),
    commentsSaga(),
    addCommentSaga(),
    deleteCommentSaga(),
    myCommentSaga(),
    updateComment(),
  ]);
}
