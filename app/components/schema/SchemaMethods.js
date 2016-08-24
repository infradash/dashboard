/* eslint no-param-reassign: ["error", { "props": false }]*/
import React, { Component } from 'react';

import {
  createRequestPromise,
  buildEndpointFromTemplate,
} from '../../utils/network';

export function createRequest(action, urlParams = {}) {
  const { url, method, params } = action;
  const endpoint = buildEndpointFromTemplate(url, urlParams);
  return (data) => createRequestPromise(endpoint, method, data, params);
}

export default () => (WrappedComponent) => {
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
      const urlParams = props.location.query;
      const activeSchema = props.schema[urlParams.schemaUrl];
      const { actions } = activeSchema;
      const methods = Object.keys(actions).reduce((requestsMap, name) => {
        requestsMap[name] = createRequest(actions[name], urlParams);
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
