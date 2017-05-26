import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hashHistory } from 'react-router';
import { NAVIGATION_WIDTH } from '../config';
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
  
  static childContextTypes = {
  	location: PropTypes.object
	};

  getChildContext() {
    return {
			location: this.props.location
		};
  }
  
  componentDidMount() {
    const {
      isAuthEnabled,
      isAuthenticated,
    } = this.props;
    if (isAuthEnabled && !isAuthenticated) {
      this.displayLoginForm(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      isAuthEnabled,
      isAuthenticated,
      modalWindowParams,
    } = newProps;
    if (isAuthEnabled && !isAuthenticated && !modalWindowParams) {
      this.displayLoginForm(newProps);
    } else if (isAuthEnabled && isAuthenticated) {
      if (newProps.location.pathname === '/' && Object.keys(newProps.location.query).length > 0) {
        hashHistory.push('/');
      }
    }
  }

  displayLoginForm(props) {
    props.actions.showModalWindow({
      content: <LoginForm location={this.props.location} providers={props.config.authentication || []} />,
    }, false);
  }

  render() {
    const {
      isConnected,
      isAuthenticated,
      isAuthEnabled,
    } = this.props;
    const docked = true;
    const navDrawerOpen = isConnected && (isAuthEnabled ? isAuthEnabled && isAuthenticated : true);
    const containerStyle = {
      marginLeft: isConnected ? NAVIGATION_WIDTH : 0,
    };
    
    return (
      <MuiThemeProvider>
        <div>
          <Header
            appearance={this.props.config.appearance}
            isConnected={isConnected}
            isLoading={this.props.isLoading}
            onRightButtonClick={this.props.actions.disconnect}
          />
          <Navigation
            routes={this.props.config.routing || []}
            docked={docked}
            open={navDrawerOpen}
            location={this.props.location.pathname}
          />
          <Main style={containerStyle}>
            {this.props.children}
          </Main>
          <NotificationBar
            message={this.props.error}
            dismissNotification={this.props.actions.closeErrorMessage}
          />
          <ModalWindow
            params={this.props.modalWindowParams}
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
    closeErrorMessage,
    showModalWindow,
    closeModalWindow,
    disconnect,
  }), dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
