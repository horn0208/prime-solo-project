const observedReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OBSERVED':
      return action.payload;
    default:
      return state;
  }
};

// forecast will be on the redux state at:
// state.observed
export default observedReducer;
