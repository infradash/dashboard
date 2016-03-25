import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReactLinked from 'react-addons-linked-state-mixin';
import reactMixin from 'react-mixin';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import { authActions, githubActions, googleActions } from 'core/auth';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200
  }
};


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
    this.login = this.login.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.githubLogin = this.githubLogin.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.actions.loginUser({
      username: this.state.username,
      password: this.state.password
    });
  }

  googleLogin(e) {
    e.preventDefault();
    this.props.actions.googleSignIn()
    .then(this.props.actions.loginUser);
  }

  githubLogin(e) {
    e.preventDefault();
    this.props.actions.githubSignIn()
    .then(this.props.actions.loginUser);
  }

  render() {
    return (
      <div style={styles.container}>
        <form onSubmit={this.login}>
          <TextField
            hintText="Username"
            valueLink={this.linkState('username')}
            errorText={this.props.statusText}
            required
          /><br />
          <TextField
            hintText="Password"
            valueLink={this.linkState('password')}
            type="password"
            required
          /><br /><br />

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

LoginForm.propTypes = {
  actions: React.PropTypes.object,
  statusText: React.PropTypes.string,
  isAuthenticating: React.PropTypes.bool
};


reactMixin(LoginForm.prototype, ReactLinked);

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth ? state.auth.isAuthenticating : null,
  statusText: state.auth ? state.auth.statusText : null
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authActions, githubActions, googleActions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
