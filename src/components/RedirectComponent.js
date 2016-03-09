import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default function redirectIfLoggedIn(Component) {
  class RedirectComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (this.props.isAuthenticated) {
        hashHistory.push('/');
      }
    }

    render() {
      return (
          <div>
            {this.props.isAuthenticated !== true
              ? <Component {...this.props} />
            : null
            }
          </div>
        );
    }
  }

  RedirectComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(RedirectComponent);
}
