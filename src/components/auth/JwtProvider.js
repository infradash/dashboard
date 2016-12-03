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
    provider: PropTypes.object,
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
    return createRequestPromise(this.props.provider.config.endpoint, 'POST', data, {}, headers)
      .then(response => {
        const headerStr = replaceValues(this.props.provider.config.header, response);
        this.props.setAuthenticationData(headerStr);
      });
  }


  render() {
    return (
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
        <RaisedButton
          type="submit"
          label={this.props.provider.label}
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
