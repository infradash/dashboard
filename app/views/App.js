import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearErrorMessage } from 'core/app';
import { logoutAndRedirect } from 'core/auth';
import resizeEvent, { LARGE } from 'utils/onResize';
import { NAVIGATION_WIDTH } from 'config';

import {
  NotificationBar,
  Header,
  Main,
  Navigation,
} from 'components/layout';


class App extends React.Component {
  static propTypes = {
    routes: PropTypes.array,
    width: PropTypes.number,
    actions: PropTypes.object,
    isAuthenticating: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object,
  }

  state = {
    navDrawerOpen: false,
  };

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };

  handleChangeRequest = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  handleChangeList = () => {
    this.setState({
      navDrawerOpen: false,
    });
  };

  render() {
    const isDesktop = this.props.width === LARGE;
    const {
      isAuthenticated,
    } = this.props;
    const containerStyle = {
      marginLeft: 0,
    };

    let docked = false;
    let {
      navDrawerOpen,
    } = this.state;

    if (isDesktop) {
      docked = true;
      navDrawerOpen = isAuthenticated;
      containerStyle.marginLeft = isAuthenticated ? NAVIGATION_WIDTH : 0;
    }

    return (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          isDesktop={isDesktop}
          isLoading={this.props.isLoading || this.props.isAuthenticating}
          onLeftButtonClick={this.handleTouchTapLeftIconButton}
          onRightButtonClick={this.props.actions.logoutAndRedirect}
        />
        <Navigation
          routes={this.props.routes[0].childRoutes}
          docked={docked}
          open={navDrawerOpen}
          location={this.props.location.pathname}
          isDesktop={isDesktop}
          onChangeList={this.handleChangeList}
          onRequestChange={this.handleChangeRequest}
        />
        <Main style={containerStyle}>
          {this.props.children}
        </Main>
        <NotificationBar
          message={this.props.error}
          dismissNotification={this.props.actions.clearErrorMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.app.isLoading,
  error: state.app.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, {
    logoutAndRedirect,
    clearErrorMessage,
  }), dispatch),
});

export default resizeEvent()(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
