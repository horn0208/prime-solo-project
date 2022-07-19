import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

function* forecastSaga(){
    yield takeEvery('FETCH_FORECAST', fetchForecast);
}

function* fetchForecast(action){
    // gets forecast for an area (GET to database and GET to API in router)
    // action.payload is area id
    try{
        // get selected area data from db
        const area = yield axios.get(`/api/areas/area/${action.payload}`);
        console.log('area result', area.data);
        const data = area.data;
        // use returned data to make API call
        const forecast = yield axios.get(`https://api.weather.gov/gridpoints/${data.office}/${data.gridx},${data.gridy}/forecast`)
        console.log('forecast', forecast.data);
        // send forecast data to reducer
        yield put({type: 'SET_FORECAST', payload: forecast.data.properties});
    } catch(err) {
        console.log('get forecast error', err);
    }
}

export default forecastSaga;