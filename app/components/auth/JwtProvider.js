import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { setAuthenticationData } from '../../core/app';
import { DEFAULT_HEADERS } from '../../config';

import {
  createRequestPromise,
  replaceValues,
} from '../../utils/network';

class JwtProvider extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    setAuthenticationData: PropTypes.func,
    config: PropTypes.object,
  }

  state = {
    username: null,
    password: null,
  }

  login = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    const headers = Object.assign({}, DEFAULT_HEADERS);
    return createRequestPromise(this.props.config.endpoint, 'POST', data, {}, headers)
      .then(response => {
        const headerStr = replaceValues(this.props.config.header, response);
        this.props.setAuthenticationData(JSON.parse(headerStr));
      });
  }


  render() {
    return (
      <form onSubmit={this.login}>
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
          disabled={this.props.isLoading}
          primary
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

// const mapDispatchToProps = (dispatch) => ({
//   setAuthenticationData: setAuthenticationData,
// });
function mapDispatchToProps(dispatch) {
  return {
    setAuthenticationData: bindActionCreators(setAuthenticationData, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JwtProvider);
