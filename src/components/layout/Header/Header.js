import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import '../../../styles/layout.css';
import { LeftIcon, MenuIcon, ProgressIcon } from './Icons';

export class Header extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDesktop: PropTypes.bool,
    onLeftButtonClick: PropTypes.func,
    onRightButtonClick: PropTypes.func.isRequired,
  }


  render() {
    const {
      appearance,
      isConnected,
      isLoading,
      isDesktop,
      onLeftButtonClick,
      onRightButtonClick,
    } = this.props;

    const leftElement = (function getElement() {
      if (isLoading) {
        return <ProgressIcon />;
      }
      if (isDesktop) {
        return <LeftIcon />;
      }
      return <MenuIcon onClick={onLeftButtonClick} />;
    }());

    const title = appearance && appearance.title ? appearance.title : null;
    const logo = appearance && appearance.logo ? <img src={appearance.logo} alt={title} /> : null;
    return (
      <AppBar
        title={<div className="logo">
          {logo}
          {title}
        </div>}
        className="header"
        iconElementLeft={leftElement}
        {...isConnected ? {
          iconElementRight: <FlatButton onClick={onRightButtonClick} label="Disconnect" />,
        } : null}
      />
    );
  }
}
