import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* forecastSaga(){
    yield takeEvery('FETCH_FORECAST', fetchForecast);
}

function* fetchForecast(action){
    // gets forecast for an area (GET to database and GET to API in router)
    // action.payload is area id
    try{
        console.log('in forecast saga');
        const forecast = yield axios.get(`/api/areas/forecast/${action.payload}`);
        console.log('forecast result', forecast.data);
        //console.log forecast.data
        // send to reducer
        
    } catch(err) {
        console.log('get forecast error', err);
    }
}

export default forecastSaga;