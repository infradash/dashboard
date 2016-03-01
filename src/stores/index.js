import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import routes from '../routes';
import {reduxReactRouter} from 'redux-router';
import { createHistory, useBasename } from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import persistState from 'redux-localstorage';

function authSlicer (paths) {
  return (state) => {
    let subset = {}
    subset.auth = {
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated
    };
    return subset;
  }
}

const history = useBasename(createHistory)({
  basename: '/dashboard'
});

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({
    routes,
    history
  }),
  persistState(null, {
    slicer: authSlicer
  }),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default finalCreateStore(rootReducer);
