import React, { PropTypes } from 'react';

import '../../styles/layout.css';

export function Main(props) {
  return (
    <div style={props.style} className="container">
      {props.children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};
