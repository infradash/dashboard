import {
  CLEAR_ERROR_MESSAGE,
  TOGGLE_MENU,
  DATA_REQUEST,
  DATA_REQUEST_DONE,
  DATA_REQUEST_FAILED,
} from './actions';

const initialState = {
  isLoading: false,
  isMenuOpen: true,
  error: null,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR_MESSAGE:
      return Object.assign({}, state, {
        error: null,
      });
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        isMenuOpen: !state.isMenuOpen,
      });
    case DATA_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case DATA_REQUEST_DONE:
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
      });
    case DATA_REQUEST_FAILED:
      return Object.assign({}, state, {
        error: action.payload.status,
      });
    default:
      return state;
  }
}
