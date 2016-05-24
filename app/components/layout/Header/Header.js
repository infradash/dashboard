import React, { PropTypes } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import layoutStyles from '../../../styles/layout.css';
import { LeftIcon, MenuIcon, ProgressIcon } from './Icons';

export function Header({
    isAuthenticated,
    isLoading,
    isDesktop,
    onLeftButtonClick,
    onRightButtonClick,
}) {
  const leftElement = (function getElement() {
    if (isLoading) {
      return <ProgressIcon />;
    }
    if (!isAuthenticated || isDesktop) {
      return <LeftIcon />;
    }
    return <MenuIcon onClick={onLeftButtonClick} />;
  }());

  return (
    <AppBar
      title="Infradash"
      className={layoutStyles.header}
      iconElementLeft={leftElement}
      {...isAuthenticated ? {
        iconElementRight: <FlatButton onClick={onRightButtonClick} label="Log out" />,
      } : null}
    />
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDesktop: PropTypes.bool,
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func.isRequired,
};
