import React, { Component } from 'react';
import { SCHEMA_INITIAL_ACTION_NAME } from 'config';
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
    updateState(propertyName, promise) {
      this.setState(prevState => ({
        methods: Object.assign({}, prevState.methods, {
          [propertyName]: promise,
        }),
      }));
    }
    mapActionsToState(props) {
      const { actions = {}, params } = getActionsConfiguration(props);
      Object.keys(actions).forEach(name => {
        const request = buildRequest(actions[name], params);
        const updateStateWith = this.updateState.bind(this, name);
        if (name === SCHEMA_INITIAL_ACTION_NAME) {
          request().then(updateStateWith).catch(() => ({}));
        } else {
          updateStateWith(request);
        }
      });
    }
    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
  return SchemaMethods;
};
