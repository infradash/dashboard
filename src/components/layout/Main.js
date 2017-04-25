import React, { PropTypes } from 'react';

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
