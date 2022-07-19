const forecastReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FORECAST':
      return action.payload;
    default:
      return state;
  }
};

// forecast will be on the redux state at:
// state.forecast
export default forecastReducer;
