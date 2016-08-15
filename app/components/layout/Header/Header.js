import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import layoutStyles from '../../../styles/layout.css';
import { LeftIcon, MenuIcon, ProgressIcon } from './Icons';

export function Header({
    isConnected,
    isLoading,
    isDesktop,
    onLeftButtonClick,
    onRightButtonClick,
}) {
  const leftElement = (function getElement() {
    if (isLoading) {
      return <ProgressIcon />;
    }
    if (isDesktop) {
      return <LeftIcon />;
    }
    return <MenuIcon onClick={onLeftButtonClick} />;
  }());

  return (
    <AppBar
      title="Infradash"
      className={layoutStyles.header}
      iconElementLeft={leftElement}
      {...isConnected ? {
        iconElementRight: <FlatButton onClick={onRightButtonClick} label="Disconnect" />,
      } : null}
    />
  );
}

Header.propTypes = {
  isConnected: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDesktop: PropTypes.bool,
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func.isRequired,
};
