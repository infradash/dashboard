import 'whatwg-fetch';
import React, { PropTypes } from 'react';
import equal from 'deep-equal';

import { SchemaView } from '../../components/schema';

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
        .then(schema => this.setState({ schema }))
        .catch(() => {});
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
