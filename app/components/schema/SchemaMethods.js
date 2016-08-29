/* eslint no-param-reassign: ["error", { "props": false }]*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createRequestPromise,
  replaceValues,
} from '../../utils/network';

export function createRequest(action, urlParams = {}, header) {
  const { url, method, params } = action;
  const endpoint = replaceValues(url, urlParams);
  return (data) => createRequestPromise(endpoint, method, data, params, header);
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
      const header = props.authHeader;
      const urlParams = props.location.query;
      const activeSchema = props.schema[urlParams.schemaUrl];
      const { actions } = activeSchema;

      const methods = Object.keys(actions).reduce((requestsMap, name) => {
        requestsMap[name] = createRequest(actions[name], urlParams, header);
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

  const mapStateToProps = (state) => ({
    authHeader: state.app.authHeader,
  });

  return connect(mapStateToProps)(SchemaMethods);
};
