import { RECEIVE_ACCOUNTS } from './actions';

const initialState = {
  list: [],
};

export function accountsRecuder(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return Object.assign({}, state, {
        list: action.accounts,
      });
    default:
      return state;
  }
}
