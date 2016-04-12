import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { authActions, POST_SIGN_IN_PATH } from 'core/auth';
import {
  Header,
  LoadingBar,
  Main,
  Navigation
} from 'components/layout';


class App extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    children: PropTypes.node,
    location: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      menu: {
        isOpen: true
      }
    };
  }

  logout = () => {
    this.props.actions.logoutAndRedirect();
  }

  handleTouchTap = () => {
    hashHistory.push(POST_SIGN_IN_PATH);
  }

  toggleMenu = () => {
    this.setState({
      menu: {
        isOpen: !this.state.menu.isOpen
      }
    });
  }

  render() {
    return (
      <div>
        <LoadingBar isLoading={this.props.isLoading} />
        <Header
          {...this.props}
          titleText="Infradash"
          onTitleClick={this.handleTouchTap}
          onLeftButtonClick={this.toggleMenu}
          onRightButtonClick={this.logout}
        />
        <Navigation
          url={this.props.location.pathname}
          isOpen={this.props.isAuthenticated && this.state.menu.isOpen}
        />
        <Main
          {...this.props}
          isMenuOpen={this.props.isAuthenticated && this.state.menu.isOpen}
        >
          {this.props.children}
        </Main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.general.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authActions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
