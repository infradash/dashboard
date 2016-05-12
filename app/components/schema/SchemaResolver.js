import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { SchemaView } from 'components/schema';

export default class SchemaResolver extends React.Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
    updateLocation: PropTypes.func.isRequired,
  }

  state = {
    schema: null,
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
      .then(schema => this.setState({ schema }));
  }

  render() {
    return (
      <div>
        {this.state.schema ?
          <SchemaView
            schema={this.state.schema}
            updateSchema={this.props.updateLocation}
          />
        : null}
      </div>
    );
  }
}
