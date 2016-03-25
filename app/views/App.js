import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import { authActions } from 'core/auth';


const styles = {
  title: {
    cursor: 'pointer'
  }
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  logout() {
    this.props.actions.logoutAndRedirect();
  }

  handleTouchTap() {
    hashHistory.push('/');
  }

  render() {
    let topBar;
    if (this.props.isAuthenticated) {
      topBar = (
        <AppBar
          title={<span style={styles.title}>Dashboard</span>}
          onTitleTouchTap={this.handleTouchTap}
          showMenuIconButton={false}
          iconElementRight={<FlatButton onClick={this.logout} label="Log out" />}
        />
      );
    } else {
      topBar = <AppBar title="Dashboard" showMenuIconButton={false} />;
    }
    return (
      <div>
        {topBar}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  actions: React.PropTypes.object,
  isAuthenticated: React.PropTypes.bool,
  children: React.PropTypes.node
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth ? state.auth.isAuthenticated : null
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authActions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
