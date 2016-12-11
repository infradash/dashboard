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
      app: {
        authHeader: state.app.authHeader,
        isAuthenticated: state.app.isAuthenticated,
        isAuthEnabled: state.app.isAuthEnabled,
        isConnected: state.app.isConnected,
        schemaHttpParamsCache: state.app.schemaHttpParamsCache,
        configPath: state.app.configPath,
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
