import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from 'core/auth';
import { generalReducer } from 'core/general';

export const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  general: generalReducer,
});
