import { authReducer } from '../core/auth';
import { appReducer } from '../core/app';

export const reducers = {
  auth: authReducer,
  app: appReducer,
};
