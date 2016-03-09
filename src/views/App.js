import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import { logoutAndRedirect } from '../actions';


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
    this.props.dispatch(logoutAndRedirect());
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
  isAuthenticated: React.PropTypes.bool,
  children: React.PropTypes.node
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth ? state.auth.isAuthenticated : null
});

export default connect(
  mapStateToProps
)(App);
