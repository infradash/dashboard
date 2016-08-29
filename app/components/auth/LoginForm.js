import React, { PropTypes } from 'react';

import RestProvider from './RestProvider';

export class LoginForm extends React.Component {
  static propTypes = {
    providers: PropTypes.array,
  }

  render() {
    const providers = this.props.providers.map(provider => {
      switch (provider.type) {
        case 'rest':
          return <RestProvider config={provider.config} />;
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
