import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { SchemaParser } from 'components/schema';
import { parseJSON } from 'utils/network';

export default class SchemaResolver extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    updatePath: PropTypes.func.isRequired,
  }

  state = {
    schemaObject: null,
  }

  componentWillMount() {
    this.loadSchema(this.props.path);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSchema(nextProps.path);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.path === nextProps.path;
  }

  loadSchema(path) {
    fetch(path)
      .then(parseJSON)
      .then(schemaObject => this.setState({ schemaObject }));
  }

  render() {
    return (
      <div>
        {this.state.schemaObject ?
        <SchemaParser
          schemaObject={this.state.schemaObject}
          updateSchema={this.props.updatePath}
        />
        : null}
      </div>
    );
  }
}
