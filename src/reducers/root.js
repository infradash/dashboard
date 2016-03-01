import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'

import auth from '../reducers/auth';

const app = combineReducers({
  routing: routerReducer,
  auth
});

export default app;
