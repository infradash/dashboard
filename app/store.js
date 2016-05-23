import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { reducer } from './core/reducer';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  persistState([
    'app',
    'auth',
  ]),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default finalCreateStore(reducer);
