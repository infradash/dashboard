import React, { PropTypes } from 'react';

import { SchemaView } from '../../components/schema';
import { createRequestPromise } from '../../utils/network';

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
    const currentLocation = this.props.location;
    const nextLocation = nextProps.location;
    return currentLocation.query === nextLocation.query &&
      currentLocation.action === nextLocation.action;
  }

  loadSchema(props) {
    const { location } = props.location.query;
    createRequestPromise(location)
      .then(schema => this.setState({ schema }));
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
