import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* allAreasSaga(){
    yield takeEvery('FETCH_ALL_AREAS', fetchAllAreas);
}

function* fetchAllAreas(){
    // get all areas from the DB
    try{
        const areas = yield axios.get('/api/areas');
        console.log('get all areas:', areas.data);
        // send areas data to reducer
        yield put({type: 'SET_AREAS', payload: areas.data});
    } catch(err) {
        console.log('get all areas error', err);
    }
}

export default allAreasSaga;