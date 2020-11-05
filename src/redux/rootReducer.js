import { combineReducers } from 'redux';
import activePanelReducer from './activePanelReducer';
import friendsReducer from './friendsReducer';
import paramsReducer from './paramsReduser';

const rootReducer = combineReducers({
  friends: friendsReducer,
  params: paramsReducer,
  panel: activePanelReducer,
});

export default rootReducer;
