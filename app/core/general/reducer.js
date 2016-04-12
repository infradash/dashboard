import { DATA_REQUEST, DATA_REQUEST_DONE } from './actions';

const initialState = {
  isLoading: false
};

export function generalReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case DATA_REQUEST_DONE:
      return Object.assign({}, state, {
        isLoading: false
      });
    default:
      return state;
  }
}
