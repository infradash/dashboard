import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        hashHistory.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props} />
          : null
          }
        </div>
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
