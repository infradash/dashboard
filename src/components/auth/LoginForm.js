import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import JwtProvider from './JwtProvider';
import OAuthProvider from './OAuthProvider';

export class LoginForm extends React.Component {
  static propTypes = {
    providers: PropTypes.array,
    location: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.providers[0].type,
    };
  }

  handleTabChange = (activeTab) => {
    this.setState({ activeTab });
  }

  render() {
    const activeProviders = this.props.providers.filter(provider => provider.enabled);
    const authForms = activeProviders.map(provider => {
      switch (provider.type) {
        case 'jwt':
          return <JwtProvider provider={provider} />;
        case 'google':
        case 'microsoft':
          return <OAuthProvider provider={provider} location={this.props.location}  />;
        default:
          return null;
      }
    });
    if (authForms.length === 1) {
      return authForms[0];
    } else {
      const { query } = this.props.location;
      const selectedTab = query && query.state ? query.state : null;
      return (
        <Tabs
          value={selectedTab || this.state.activeTab}
          onChange={this.handleTabChange}
        >
        {authForms.map((form, index) => (
          <Tab style={{'textTransform': 'none'}} label={activeProviders[index].title   || activeProviders[index].type} value={activeProviders[index].type} key={activeProviders[index].type}>
            {form}
          </Tab>
        ))}
        </Tabs>
      );
    }
  }
}
