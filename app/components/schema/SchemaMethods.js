import React, { Component } from 'react';
import { createRequestPromise, buildEndpoint } from 'utils/network';

export function buildRequest(action, urlParams = {}) {
  const { url, method } = action;
  const endpoint = buildEndpoint(url, urlParams);
  return (data) => createRequestPromise(endpoint, method, data);
}

export default (getActionsConfiguration) => (WrappedComponent) => {
  class SchemaMethods extends Component {
    state = {
      methods: {},
    }
    componentWillMount() {
      this.mapActionsToState(this.props);
    }
    componentWillReceiveProps(nextProps) {
      this.mapActionsToState(nextProps);
    }
    mapActionsToState(props) {
      const { actions = {}, params } = getActionsConfiguration(props);
      const methods = Object.keys(actions).reduce((requestsMap, name) => {
        requestsMap[name] = buildRequest(actions[name], params);
        return requestsMap;
      }, {});
      this.setState(prevState => ({
        methods: Object.assign({}, prevState.methods, methods),
      }));
    }
    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
  return SchemaMethods;
};
