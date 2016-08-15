import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { reducers } from './core/reducers';

function stateSlice() {
  return (state) => {
    const subset = {
      // auth: {
      //   token: state.auth.token,
      //   isAuthenticated: state.auth.isAuthenticated,
      // },
      app: {
        isConnected: state.app.isConnected,
        config: state.app.config,
      },
    };
    return subset;
  };
}

const finalCreateStore = compose(
  applyMiddleware(thunk),
  persistState(null, {
    slicer: stateSlice,
  }),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default finalCreateStore(combineReducers(reducers));
