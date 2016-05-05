import React, { PropTypes } from 'react';
import layoutStyles from 'styles/layout.css';

export function Main(props) {
  return (
    <div style={props.style} className={layoutStyles.container}>
      {props.children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};
