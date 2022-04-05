import { REQUEST_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return action.payload;
  default:
    return state;
  }
}

export default token;
