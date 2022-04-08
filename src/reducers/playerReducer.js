import { SUBMIT_PLAYER, UPDATE_SCORE, NEW_PLAYER } from '../actions'; // importa action type

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload.points,
      assertions: state.assertions + action.payload.assertions,
    };
  case NEW_PLAYER:
    return INITIAL_STATE;
  default:
    return state;
  }
}

export default playerReducer;
