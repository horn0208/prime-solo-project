const areasReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AREAS':
      return action.payload;
    default:
      return state;
  }
};

// areas will be on the redux state at:
// state.areas
export default areasReducer;
