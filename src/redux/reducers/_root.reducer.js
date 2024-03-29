import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import areas from './areas.reducer';
import comments from './comments.reducer';
import comment from './comment.reducer';
import forecast from './forecast.reducer';
import observed from './observed.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  areas, // contains data for all areas
  comments, // contains all comments for selected area (from Area Details)
  comment, // contains one selected comment
  forecast, //forecast and times for selected area
  observed, // latest observed weather conditions for selected area
});

export default rootReducer;
