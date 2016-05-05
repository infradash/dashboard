import React, { PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import layoutStyles from 'styles/layout.css';

import IconButton from 'material-ui/lib/icon-button';
import Menu from 'material-ui/lib/svg-icons/navigation/menu';
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import CircularProgress from 'material-ui/lib/circular-progress';

export function Header({
    titleText,
    isAuthenticated,
    isLoading,
    onTitleClick,
    onLeftButtonClick,
    onRightButtonClick,
}) {
  const icon = isAuthenticated ? <Menu /> : <ChevronRight />;
  const leftElement = isLoading ?
    <CircularProgress size={0.4} color="#fff" mode="indeterminate" /> :
    <IconButton
      onClick={onLeftButtonClick}
      className={layoutStyles.buttonStyle}
      disabled={!isAuthenticated}
    >
      {icon}
    </IconButton>;
  return (
    <AppBar
      className={layoutStyles.header}
      iconElementLeft={leftElement}
      title={<span {...isAuthenticated ? { className: layoutStyles.title } : {}}>{titleText}</span>}
      {...isAuthenticated ? {
        onTitleTouchTap: onTitleClick,

        iconElementRight: <FlatButton onClick={onRightButtonClick} label="Log out" />,
      } : {}}
    />
  );
}

Header.propTypes = {
  titleText: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  onTitleClick: PropTypes.func.isRequired,
  onLeftButtonClick: PropTypes.func.isRequired,
  onRightButtonClick: PropTypes.func.isRequired,
};
