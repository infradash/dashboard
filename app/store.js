import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { reducers } from './core/reducers';

function authSlicer() {
  return (state) => {
    const subset = {};
    subset.auth = {
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
    };
    return subset;
  };
}

const finalCreateStore = compose(
  applyMiddleware(thunk),
  persistState(null, {
    slicer: authSlicer,
  }),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default finalCreateStore(combineReducers(reducers));
