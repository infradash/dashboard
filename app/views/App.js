import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { clearErrorMessage, toggleMenu } from 'core/app';
import { logoutAndRedirect, POST_SIGN_IN_PATH } from 'core/auth';

import {
  NotificationBar,
  Header,
  LoadingBar,
  Main,
  Navigation,
} from 'components/layout';


class App extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    isMenuOpen: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object,
  }

  handleTouchTap = () => {
    hashHistory.push(POST_SIGN_IN_PATH);
  }

  render() {
    return (
      <div>
        <LoadingBar isLoading={this.props.isLoading} />
        <Header
          {...this.props}
          titleText="Infradash"
          onTitleClick={this.handleTouchTap}
          onLeftButtonClick={this.props.actions.toggleMenu}
          onRightButtonClick={this.props.actions.logoutAndRedirect}
        />
        <Navigation
          url={this.props.location.pathname}
          isOpen={this.props.isAuthenticated && this.props.isMenuOpen}
        />
        <Main
          {...this.props}
          isMenuOpen={this.props.isAuthenticated && this.props.isMenuOpen}
        >
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
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.app.isLoading,
  isMenuOpen: state.app.isMenuOpen,
  error: state.app.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, {
    logoutAndRedirect,
    clearErrorMessage,
    toggleMenu,
  }), dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
