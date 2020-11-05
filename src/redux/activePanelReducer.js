const initialState = 'friends';

const activePanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PANEL':
      return action.payload;
    default:
      return state;
  }
};

export default activePanelReducer;
