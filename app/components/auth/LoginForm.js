import React, { PropTypes } from 'react';

import JwtProvider from './JwtProvider';

export class LoginForm extends React.Component {
  static propTypes = {
    providers: PropTypes.array,
  }

  render() {
    const providers = this.props.providers.map(provider => {
      switch (provider.type) {
        case 'jwt':
          return <JwtProvider config={provider.config} />;
        default:
          return <div />;
      }
    });

    if (providers.length === 1) {
      return providers[0];
    }
    return <div />;
  }
}
