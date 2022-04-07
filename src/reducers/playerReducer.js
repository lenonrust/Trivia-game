import { SUBMIT_PLAYER } from '../actions'; // importa action type

const INITIAL_STATE = {
  name: 'Tulio Maravilha',
  assertions: 2,
  score: 120,
  gravatarEmail: 'jorge@jorjao.com',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  default:
    return state;
  }
}

export default playerReducer;
