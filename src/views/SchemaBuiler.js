import React, { PropTypes, Component } from 'react';
import { SchemaResolver } from '../components/schema';

export default class Schema extends Component {

  shouldComponentUpdate(nextProps) {
    const oldLocation = this.props.location;
    const newLocation = nextProps.location;
    return (oldLocation.query !== newLocation.query) && (oldLocation.action === 'POP' && newLocation.action === 'POP');
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
