import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';

import { Button } from '../../components/layout';
import { setAuthenticationData } from '../../core/app';
import { httpRequest } from '../../core/network';

import { replaceValues } from '../../utils/network';

class JwtProvider extends React.Component {
  static propTypes = {
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
    this.props.httpRequest(this.props.provider.config.endpoint, 'POST', data)
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
        <Button
          type="submit"
          label={this.props.provider.label}
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
    httpRequest: bindActionCreators(httpRequest, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JwtProvider);
