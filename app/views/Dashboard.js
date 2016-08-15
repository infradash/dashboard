import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import layoutStyles from '../styles/layout.css';

import { connect } from 'react-redux';
import { loadConfig } from '../core/app';

class Dashboard extends React.Component {
  static propTypes = {
    loadConfig: PropTypes.func,
  }

  state = {
    configPath: 'json/config.json',
  }

  connectApp = (e) => {
    e.preventDefault();
    this.props.loadConfig(this.state.configPath);
  }

  render() {
    return (
      <div className={layoutStyles.loginForm}>
        <form onSubmit={this.connectApp}>
          <TextField
            hintText="Path to config"
            value={this.state.configPath}
            onChange={e => this.setState({ configPath: e.target.value })}
            required
          /><br />
          <RaisedButton
            type="submit"
            label="Connect"
            primary
          />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { loadConfig }
)(Dashboard);
