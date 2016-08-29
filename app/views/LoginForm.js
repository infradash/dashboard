import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as authActions from '../core/auth/actions';

class LoginForm extends React.Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool,
    actions: PropTypes.object,
    config: PropTypes.object,
  }

  state = {
    username: null,
    password: null,
  }

  providers = {
    rest: {
      onSubmit(e) {
        e.preventDefault();
        // console.log(this);
        // const {
        //   username,
        //   password,
        // } = this.state;
        // this.props.actions.loginUser({
        //   username,
        //   password,
        // });
      },
      template: (
        <form onSubmit={(evt) => this.providers.rest.onSubmit(evt)}>
          <h3>Authentication required</h3>
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
          <RaisedButton
            type="submit"
            label="Log in"
            disabled={this.props.isAuthenticating}
            primary
          />
        </form>
      ),
    },
  }

  render() {
    return this.providers.rest.template;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, { ...authActions }), dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
