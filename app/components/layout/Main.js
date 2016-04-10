import React, { PropTypes } from 'react';
import layoutStyles from 'styles/layout.css';

export function Main({ isMenuOpen, children }) {
  return (
    <div
      {...isMenuOpen ?
        { className: layoutStyles.layout }
      :
        { className: layoutStyles.marginTop }
      }
    >
      {children}
    </div>
  );
}

Main.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  children: PropTypes.node
};
