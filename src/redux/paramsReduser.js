const initialState = { name: '', ageRange: [14, 100], sex: 0 };

const paramsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_AGERANGE':
      return { ...state, ageRange: action.payload };
    case 'SET_SEX':
      return { ...state, sex: action.payload };
    default:
      return state;
  }
};

export default paramsReducer;
