import React, { PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
// import LinearProgress from 'material-ui/lib/linear-progress';
// import IconButton from 'material-ui/lib/icon-button';
// import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import layoutStyles from 'styles/layout.css';
// let loadingBar = this.props.isAuthenticating ? <LinearProgress mode="indeterminate" /> : null;

export function Header({
    titleText,
    isAuthenticated,
    onTitleClick,
    onLeftButtonClick,
    onRightButtonClick
}) {
  return (
    <AppBar
      title={<span {...isAuthenticated ? { className: layoutStyles.title } : {}}>{titleText}</span>}
      showMenuIconButton={isAuthenticated}
      {...isAuthenticated ? {
        onTitleTouchTap: onTitleClick,
        onLeftIconButtonTouchTap: onLeftButtonClick,
        iconElementRight: <FlatButton onClick={onRightButtonClick} label="Log out" />
      } : {}}
    />
  );
}

Header.propTypes = {
  titleText: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  onTitleClick: PropTypes.func.isRequired,
  onLeftButtonClick: PropTypes.func.isRequired,
  onRightButtonClick: PropTypes.func.isRequired
};
