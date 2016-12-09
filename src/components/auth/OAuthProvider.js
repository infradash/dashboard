import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientOAuth2 from 'client-oauth2';
import RaisedButton from 'material-ui/RaisedButton';

import { setAuthenticationData, dataRequestFailed } from '../../core/app';
import { replaceValues } from '../../utils/network';


class OAuthProvider extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    provider: PropTypes.object,
    dataRequestFailed: PropTypes.func,
    setAuthenticationData: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.redirectUri  = `${window.location.origin}${window.location.pathname}`;
    this.oauth = new ClientOAuth2(Object.assign({
      state: props.provider.type,
      redirectUri: this.redirectUri
    }, props.provider.config.oauth));
  }

  generateUrl = () => {
    return this.oauth.token.getUri();
  }

  getToken = (queryString) => {
    this.oauth.token.getToken(`${this.redirectUri}${queryString}`)
      .then(user => {
        setTimeout(()=>{
          const headerStr = replaceValues(this.props.provider.config.header, user);
          this.props.setAuthenticationData(headerStr);
        }, 500);
      });
  }

  componentDidMount() {
    const { query } = this.props.location;
    if (query && query.state === this.props.provider.type) {
      this.getToken(this.props.location.search);
    } else if (query && query.error) {
      this.props.dataRequestFailed(query.error);
    }
  }

  render() {
    return (
      <div style={{textAlign:'center', marginTop: '20px'}}>
        <a href={this.generateUrl()}>
          <RaisedButton
            label={this.props.provider.label}
            disabled={!!this.props.location.query.code}
            type="button"
            primary
          />
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

function mapDispatchToProps(dispatch) {
  return {
    setAuthenticationData: bindActionCreators(setAuthenticationData, dispatch),
    dataRequestFailed: bindActionCreators(dataRequestFailed, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OAuthProvider);
