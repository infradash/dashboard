import React from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          {routes}
        </Provider>
      </div>
    );
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
};

export default Root;
