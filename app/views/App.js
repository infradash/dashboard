import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { NAVIGATION_WIDTH } from '../config';
import resizeEvent, { LARGE } from '../utils/onResize';
import { logoutAndRedirect } from '../core/auth';
import {
  closeErrorMessage,
  closeModalWindow,
  showModalWindow,
  disconnect,
} from '../core/app';
import {
  LoginForm,
} from '../components/auth';
import {
  Header,
  Main,
  ModalWindow,
  Navigation,
  NotificationBar,
} from '../components/layout';

class App extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    width: PropTypes.number,
    actions: PropTypes.object,
    isAuthEnabled: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    isConnected: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    modalWindowParams: PropTypes.object,
    children: PropTypes.node,
    location: PropTypes.object,
  }

  state = {
    navDrawerOpen: false,
  };

  componentWillMount() {
    if (this.props.isAuthEnabled && !this.props.isAuthenticated) {
      this.props.actions.showModalWindow({
        message: <LoginForm providers={this.props.config.authentication || []} />,
      }, false);
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      isAuthEnabled,
      isAuthenticated,
      modalWindowParams,
    } = newProps;
    if (isAuthEnabled && !isAuthenticated && !modalWindowParams) {
      newProps.actions.showModalWindow({
        message: <LoginForm providers={newProps.config.authentication || []} />,
      }, false);
    } else if (modalWindowParams && !modalWindowParams.showButtons && isAuthEnabled && isAuthenticated) {
      newProps.actions.closeModalWindow();
    }
  }

  componentWillUnmount() {
    this.props.actions.closeModalWindow();
  }

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

  handleModalClose = () => {
    this.props.actions.closeModalWindow();
    if (this.props.modalWindowParams && this.props.modalWindowParams.redirect) {
      hashHistory.push(this.props.modalWindowParams.redirect);
    }
  }

  render() {
    const isDesktop = this.props.width === LARGE;
    const {
      isConnected,
      isAuthenticated,
      isAuthEnabled,
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
      navDrawerOpen = isConnected && (isAuthEnabled ? isAuthEnabled && isAuthenticated : true);
      containerStyle.marginLeft = isConnected ? NAVIGATION_WIDTH : 0;
    }
    const {
      message,
      showButtons,
    } = this.props.modalWindowParams || {};

    return (
      <MuiThemeProvider>
        <div>
          <Header
            isConnected={isConnected}
            isDesktop={isDesktop}
            isLoading={this.props.isLoading}
            onLeftButtonClick={this.handleTouchTapLeftIconButton}
            onRightButtonClick={this.props.actions.disconnect}
          />
          <Navigation
            routes={this.props.config.routing || []}
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
            dismissNotification={this.props.actions.closeErrorMessage}
          />
          <ModalWindow
            onModalClose={this.handleModalClose}
            text={message}
            showDefaultButtons={showButtons}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  modalWindowParams: state.app.modalWindowParams,
  isAuthEnabled: state.app.isAuthEnabled,
  isAuthenticated: state.app.isAuthenticated,
  isConnected: state.app.isConnected,
  isLoading: state.app.isLoading,
  config: state.app.config,
  error: state.app.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, {
    logoutAndRedirect,
    closeErrorMessage,
    showModalWindow,
    closeModalWindow,
    disconnect,
  }), dispatch),
});

export default resizeEvent()(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
