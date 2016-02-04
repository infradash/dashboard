import React from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth();
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth();
        }

        checkAuth () {
            if (!this.props.isAuthenticated) {
                this.props.dispatch(pushState(null, `/login`));
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}

export function redirectIfLoggedIn(Component) {
  class RedirectComponent extends React.Component {

      componentWillMount () {
          this.checkAuth();
      }

      componentWillReceiveProps (nextProps) {
          this.checkAuth();
      }

      checkAuth () {
          if (this.props.isAuthenticated) {
              this.props.dispatch(pushState(null, `/`));
          }
      }

      render () {
          return (
              <div>
                  {this.props.isAuthenticated !== true
                      ? <Component {...this.props}/>
                      : null
                  }
              </div>
          )

      }
  }

  const mapStateToProps = (state) => ({
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(RedirectComponent);
}
