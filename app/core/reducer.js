import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from 'core/auth';
import { appReducer } from 'core/app';

export const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  app: appReducer,
});
