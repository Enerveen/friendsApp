import { combineReducers } from 'redux';
import appStateReducer from './appStateReducer';
import friendsReducer from './friendsReducer';
import paramsReducer from './paramsReduser';

const rootReducer = combineReducers({
  friends: friendsReducer,
  params: paramsReducer,
  app: appStateReducer,
});

export default rootReducer;
