import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import { authActions, POST_SIGN_IN_PATH } from 'core/auth';


const styles = {
  title: {
    cursor: 'pointer'
  }
};

class App extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  logout() {
    this.props.actions.logoutAndRedirect();
  }

  handleTouchTap() {
    hashHistory.push(POST_SIGN_IN_PATH);
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authActions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
