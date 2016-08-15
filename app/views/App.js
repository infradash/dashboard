import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { NAVIGATION_WIDTH } from '../config';
import resizeEvent, { LARGE } from '../utils/onResize';
import { logoutAndRedirect } from '../core/auth';
import {
  closeErrorMessage,
  closeModalWindow,
  disconnect,
} from '../core/app';
import {
  Header,
  Main,
  ModalWindow,
  Navigation,
  NotificationBar,
} from '../components/layout';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    width: PropTypes.number,
    actions: PropTypes.object,
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
    const { redirect } = this.props.modalWindowParams;
    this.props.actions.closeModalWindow();
    if (redirect) {
      hashHistory.push(redirect);
    }
  }

  render() {
    const isDesktop = this.props.width === LARGE;
    const {
      isConnected,
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
      navDrawerOpen = isConnected;
      containerStyle.marginLeft = isConnected ? NAVIGATION_WIDTH : 0;
    }

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
            text={this.props.modalWindowParams ? this.props.modalWindowParams.message : null}
            onModalClose={this.handleModalClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  modalWindowParams: state.app.modalWindowParams,
  isConnected: state.app.isConnected,
  isLoading: state.app.isLoading,
  config: state.app.config,
  error: state.app.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, {
    logoutAndRedirect,
    closeErrorMessage,
    closeModalWindow,
    disconnect,
  }), dispatch),
});

export default resizeEvent()(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
