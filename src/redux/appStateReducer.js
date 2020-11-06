const initialState = { activePanel: 'friends', isLoading: true };

const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PANEL':
      return { ...state, activePanel: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default appStateReducer;
