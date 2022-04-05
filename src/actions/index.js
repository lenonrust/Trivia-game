export const SUBMIT_PLAYER = 'SUBMIT_PLAYER';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const submitPlayer = (payload) => ({
  type: SUBMIT_PLAYER,
  payload,
});

export const requestToken = (payload) => ({
  type: REQUEST_TOKEN,
  payload,
});

export const getToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  dispatch(requestToken(data.token));
};

// function requestCurrencies() {
//   return { type: REQUEST_CURRENCIES };
// }

// function failedRequest(error) {
//   return { type: FAILED_REQUEST, payload: error };
// }
