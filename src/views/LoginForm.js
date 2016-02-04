import React from 'react';
import ReactLinked from 'react-addons-linked-state-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import * as actionCreators from '../actions';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';



const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }

  login(e) {
      e.preventDefault();
      this.props.actions.loginUser(this.state.username, this.state.password);
  }

  render() {
    return (
      <div style={styles.container}>
        <form onSubmit={this.login.bind(this)}>
          <TextField
            hintText="Username"
            valueLink={this.linkState('username')}
            errorText={this.props.statusText}
          /><br/>
          <TextField
            hintText="Password"
            valueLink={this.linkState('password')}
            type="password"
          /><br/><br/>
          <RaisedButton
            type="submit"
            disabled={this.props.isAuthenticating}
            label="Log in"
            primary={true}
          />
        </form>
      </div>
    )
  }
}

reactMixin(LoginForm.prototype, ReactLinked);

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth ? state.auth.isAuthenticating : null,
  statusText: state.auth ? state.auth.statusText : null
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
