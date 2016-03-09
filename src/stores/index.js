import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import rootReducer from '../reducers/root';

function authSlicer() {
  return (state) => {
    const subset = {};
    subset.auth = {
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated
    };
    return subset;
  };
}

const finalCreateStore = compose(
  applyMiddleware(thunk),
  persistState(null, {
    slicer: authSlicer
  }),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default finalCreateStore(rootReducer);
