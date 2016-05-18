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
  getRoutes,
} from '../core/app';
import {
  Header,
  Main,
  ModalWindow,
  Navigation,
  NotificationBar,
} from '../components/layout';


class App extends React.Component {
  static propTypes = {
    dynamicRoutes: PropTypes.array,
    width: PropTypes.number,
    actions: PropTypes.object,
    isAuthenticated: PropTypes.bool,
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
    this.props.actions.getRoutes('json/routes.json');
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
    const { redirect } = this.props.modalWindowParams;
    this.props.actions.closeModalWindow();
    if (redirect) {
      hashHistory.push(redirect);
    }
  }

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
          isLoading={this.props.isLoading}
          onLeftButtonClick={this.handleTouchTapLeftIconButton}
          onRightButtonClick={this.props.actions.logoutAndRedirect}
        />
        <Navigation
          routes={this.props.dynamicRoutes}
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
          text={this.props.modalWindowParams.message}
          onModalClose={this.handleModalClose}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modalWindowParams: state.app.modalWindowParams,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.app.isLoading,
  dynamicRoutes: state.app.dynamicRoutes,
  error: state.app.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, {
    logoutAndRedirect,
    closeErrorMessage,
    closeModalWindow,
    getRoutes,
  }), dispatch),
});

export default resizeEvent()(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
