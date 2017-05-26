import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

import { LeftIcon, ProgressIcon } from './Icons';

export class Header extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRightButtonClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      appearance,
      isConnected,
      isLoading,
      onRightButtonClick,
    } = this.props;

    const leftElement = (function getElement() {
      if (isLoading) {
        return <ProgressIcon />;
      }
      return <LeftIcon />;
    }());

    const title = appearance && appearance.title ? <div>{appearance.title}</div> : null;
    const logo = appearance && appearance.logo ? <Link to="/"><img src={appearance.logo} alt={title} /></Link> : null;
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
