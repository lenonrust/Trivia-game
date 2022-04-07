import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  token,
});

export default rootReducer;
