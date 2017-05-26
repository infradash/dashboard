import React from 'react';
import PropTypes from 'prop-types';

export function Main(props) {
  return (
    <div style={props.style} className="container-wrapper">
      {props.children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};
