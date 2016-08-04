import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import layoutStyles from '../styles/layout.css';
import * as authActions from '../core/auth/actions';
import { getRoutes } from '../core/app';

class LoginForm extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    isAuthenticating: PropTypes.bool,
  }

  state = {
    username: null,
    password: null,
    routesPath: null,
  }

  login = (e) => {
    e.preventDefault();
    const {
      username,
      password,
      routesPath,
    } = this.state;
    this.props.actions.getRoutes(routesPath);
    this.props.actions.loginUser({
      username,
      password,
    });
  }

  googleLogin = () => {
    this.props.actions.googleSignIn()
      .then(this.props.actions.loginUser);
  }

  githubLogin = () => {
    this.props.actions.githubSignIn()
      .then(this.props.actions.loginUser);
  }

  render() {
    return (
      <div className={layoutStyles.loginForm}>
        <form onSubmit={this.login}>
          <TextField
            hintText="Username"
            onChange={e => this.setState({ username: e.target.value })}
            required
          /><br />
          <TextField
            hintText="Password"
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            required
          /><br /><br />
          <TextField
            hintText="Path to routes"
            onChange={e => this.setState({ routesPath: e.target.value })}
            required
          /><br />
          <RaisedButton
            type="submit"
            label="Log in"
            disabled={this.props.isAuthenticating}
            primary
          />
          <RaisedButton
            label="Google login"
            disabled={this.props.isAuthenticating}
            onClick={this.googleLogin}
            secondary
          />
          <RaisedButton
            label="Github login"
            disabled={this.props.isAuthenticating}
            onClick={this.githubLogin}
            secondary
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, { ...authActions, getRoutes }), dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
