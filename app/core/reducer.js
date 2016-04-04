import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from 'core/auth';
import { accountsRecuder } from 'core/accounts';

export const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  accounts: accountsRecuder
});
