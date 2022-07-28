import axios from "axios";
import {put, takeEvery, delay} from 'redux-saga/effects';

let tries = 0;

function* forecastSaga(){
    yield takeEvery('FETCH_FORECAST', fetchForecast);
}

function* fetchForecast(action){
    // gets forecast for an area (GET to database and GET to API in router)
    // action.payload is area id (just a number)
    try{
        console.log(action.payload);
        // get selected area data from db
        const area = yield axios.get(`/api/areas/area/${action.payload}`);
        console.log('area result', area.data);
        const data = area.data;

        // use returned data to make FORECAST API call
        const forecast = yield axios.get(`https://api.weather.gov/gridpoints/${data.office}/${data.gridx},${data.gridy}/forecast`);
        console.log('forecast', forecast.data);
        // send forecast data to reducer
        yield put({type: 'SET_FORECAST', payload: forecast.data.properties});

        // make OBSERVED/HISTORICAL PRECIP API call
        const past = yield axios.get(`https://api.weather.gov/stations/${data.station}/observations/latest`);
        console.log('past:', past.data);
        // send observed weather data to reducer
        yield put({type: 'SET_OBSERVED', payload: past.data.properties});

        //if everything worked, reset tries to 0:
        yield tries = 0;

    } catch(err) {
        console.log('get forecast/observed error', err);
        // if there's an error, try above requests 5 more times with a delay
        if (tries < 5) {
            yield tries++;
            yield delay(500*tries); //exponential backoff: delay increases each time
            yield put({ type: 'FETCH_FORECAST', action: action });
        } else {
            // alert('National Weather Service API not responding. Refresh to retry');
            yield tries = 0;
        }
    }
}

export default forecastSaga;