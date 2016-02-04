import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import auth from '../reducers/auth';

const app = combineReducers({
  router: routerStateReducer,
  auth
});

export default app;
