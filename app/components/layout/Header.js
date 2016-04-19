import React, { PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import layoutStyles from 'styles/layout.css';

export function Header({
    titleText,
    isAuthenticated,
    onTitleClick,
    onLeftButtonClick,
    onRightButtonClick,
}) {
  return (
    <AppBar
      className={layoutStyles.header}
      title={<span {...isAuthenticated ? { className: layoutStyles.title } : {}}>{titleText}</span>}
      showMenuIconButton={isAuthenticated}
      {...isAuthenticated ? {
        onTitleTouchTap: onTitleClick,
        onLeftIconButtonTouchTap: onLeftButtonClick,
        iconElementRight: <FlatButton onClick={onRightButtonClick} label="Log out" />,
      } : {}}
    />
  );
}

Header.propTypes = {
  titleText: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  onTitleClick: PropTypes.func.isRequired,
  onLeftButtonClick: PropTypes.func.isRequired,
  onRightButtonClick: PropTypes.func.isRequired,
};
