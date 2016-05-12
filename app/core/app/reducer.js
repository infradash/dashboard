import {
  CLEAR_ERROR_MESSAGE,
  DATA_REQUEST,
  DATA_REQUEST_SUCCESSFUL,
  DATA_REQUEST_FAILED,
} from './actions';

const initialState = {
  isLoading: false,
  error: null,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR_MESSAGE:
      return Object.assign({}, state, {
        error: null,
      });
    case DATA_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case DATA_REQUEST_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
      });
    case DATA_REQUEST_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.status,
      });
    default:
      return state;
  }
}
