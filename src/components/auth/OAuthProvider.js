import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientOAuth2 from 'client-oauth2';
import uuid from 'node-uuid';
import { Button } from '../../components/layout';

import {
  networkRequest,
  networkRequestFailed,
  networkRequestSuccessful
} from '../../core/network';
import { setAuthenticationData } from '../../core/app';
import { replaceValues } from '../../utils/network';
import { HOST_PATH } from '../../config';


class OAuthProvider extends React.Component {
  static propTypes = {
    provider: PropTypes.object,
    networkRequest: PropTypes.func,
    networkRequestFailed: PropTypes.func,
    networkRequestSuccessful: PropTypes.func,
    setAuthenticationData: PropTypes.func
  }

  constructor(props) {
    super(props);
    if (window.opener) {
      window.opener.oauth2CallbackSuccess(window.location, props.provider.type);
    }
  }

  generateUrl = () => {
    this.oauth = new ClientOAuth2(Object.assign({
      state: uuid.v4(),
      redirectUri: HOST_PATH
    }, this.props.provider.config.oauth));

    return this.oauth.token.getUri({
      query: Object.assign({}, this.props.provider.config.query)
    });
  }

  getToken = (queryString) => {
    this.isTokenReceived = true;
    const url = `${HOST_PATH}${queryString}`;
    this.oauth.token.getToken(url)
      .then(user => {
        const headerStr = replaceValues(this.props.provider.config.header, user);
        this.props.setAuthenticationData(headerStr);
      })
      .catch(err => {
        this.props.networkRequestFailed(err.toString());
      });
  }

  login = () => {
    this.isTokenReceived = false;
    this.props.networkRequest();
    const url = this.generateUrl();
    const popup = window.open(url, null, 'top=100,left=100,width=500,height=500');
    const interval = setInterval(() => {
      if (popup.closed) {
        if (!this.isTokenReceived) {
          this.props.networkRequestSuccessful();
        }
        clearInterval(interval);
      }
    }, 500);

    window.oauth2CallbackSuccess = (uri, type) => {
      if (type === this.props.provider.type) {
        this.getToken(uri.hash.slice(2));
        popup.close();
        this.props.networkRequestSuccessful();
      }
    };
  }

  render() {
    return (
      <div style={{textAlign:'center', marginTop: '20px'}}>
        <Button
          onTouchTap={this.login}
          label={this.props.provider.label}
          type="button"
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthenticationData: bindActionCreators(setAuthenticationData, dispatch),
    networkRequest: bindActionCreators(networkRequest, dispatch),
    networkRequestFailed: bindActionCreators(networkRequestFailed, dispatch),
    networkRequestSuccessful: bindActionCreators(networkRequestSuccessful, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(OAuthProvider);
