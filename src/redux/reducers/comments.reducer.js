const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload;
    default:
      return state;
  }
};

// areas will be on the redux state at:
// state.comments
export default commentsReducer;
