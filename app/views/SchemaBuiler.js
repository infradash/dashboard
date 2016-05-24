import React, { PropTypes } from 'react';
import { SchemaResolver } from '../components/schema';

export default function Schema(props) {
  return (
    <SchemaResolver location={props.location} />
  );
}

Schema.propTypes = {
  location: PropTypes.object.isRequired,
};
