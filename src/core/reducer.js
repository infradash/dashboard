import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from 'core/auth';

export const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer
});
