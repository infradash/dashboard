import React, { PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import layoutStyles from 'styles/layout.css';
import LeftIcon from './LeftIcon';
import ProgressIndicator from './ProgressIndicator';

export function Header({
    titleText,
    isAuthenticated,
    isLoading,
    onTitleClick,
    onLeftButtonClick,
    onRightButtonClick,
}) {
  const leftElement = isLoading ? <ProgressIndicator /> :
        <LeftIcon onClick={onLeftButtonClick} isAuthenticated={isAuthenticated} />;
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
