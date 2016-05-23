import { combineReducers } from 'redux';

import { authReducer } from '../core/auth';
import { appReducer } from '../core/app';

export const reducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});
