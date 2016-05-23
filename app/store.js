import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { reducers } from './core/reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  persistState([
    'app',
    'auth',
  ]),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default finalCreateStore(combineReducers(reducers));
