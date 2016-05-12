import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { SchemaParser } from 'components/schema';

export default class SchemaResolver extends React.Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
    updateLocation: PropTypes.func.isRequired,
  }

  state = {
    schemaObject: null,
  }

  componentWillMount() {
    this.loadSchema(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSchema(nextProps.location);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.location === nextProps.location;
  }

  loadSchema(location) {
    fetch(location)
      .then(response => response.json())
      .then(schemaObject => this.setState({ schemaObject }));
  }

  render() {
    return (
      <div>
        {this.state.schemaObject ?
          <SchemaParser
            schemaObject={this.state.schemaObject}
            updateSchema={this.props.updateLocation}
          />
        : null}
      </div>
    );
  }
}
