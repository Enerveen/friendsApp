const initialState = [];

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_FRIENDS':
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default friendsReducer;
