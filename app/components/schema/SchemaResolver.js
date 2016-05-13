import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { SchemaView } from 'components/schema';
import equal from 'deep-equal';

export default class SchemaResolver extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    schema: null,
  }

  componentWillMount() {
    this.loadSchema(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSchema(nextProps);
  }

  shouldComponentUpdate(nextProps) {
    return equal(this.props.location.query, nextProps.location.query);
  }

  loadSchema(props) {
    const { location } = props.location.query;
    if (location) {
      fetch(location)
        .then(response => response.json())
        .then(schema => this.setState({ schema }));
    }
  }

  render() {
    return (
      <div>
        {this.state.schema ?
          <SchemaView
            schema={this.state.schema}
            location={this.props.location}
          />
        : null}
      </div>
    );
  }
}
