import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import { authActions } from 'core/auth';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200
  }
};

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
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

  googleLogin() {
    this.props.actions.googleSignIn()
      .then(this.props.actions.loginUser);
  }

  githubLogin() {
    this.props.actions.githubSignIn()
      .then(this.props.actions.loginUser);
  }

  render() {
    return (
      <div style={styles.container}>
        <form onSubmit={this.login}>
          <TextField
            hintText="Username"
            onChange={e => this.setState({ username: e.target.value })}
            errorText={this.props.statusText}
            required
          /><br />
          <TextField
            hintText="Password"
            onChange={e => this.setState({ password: e.target.value })}
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

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authActions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
