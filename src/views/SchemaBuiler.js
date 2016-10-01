import React, { PropTypes, Component } from 'react';
import { SchemaResolver } from '../components/schema';

export default class Schema extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.location.query !== nextProps.location.query;
  }

  render() {
    return (
      <SchemaResolver location={this.props.location} />
    );
  }
}

Schema.propTypes = {
  location: PropTypes.object.isRequired,
};
