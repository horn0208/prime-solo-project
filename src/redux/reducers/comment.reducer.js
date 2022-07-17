const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MY_COMMENT':
      return action.payload;
    default:
      return state;
  }
};

// areas will be on the redux state at:
// state.comment
export default commentReducer;
