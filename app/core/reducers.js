import { routerReducer } from 'react-router-redux';
import { authReducer } from '../core/auth';
import { appReducer } from '../core/app';

export const reducers = {
  routing: routerReducer,
  auth: authReducer,
  app: appReducer,
};
