import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/layout.css';

import { connect } from 'react-redux';
import { loadConfig } from '../core/app';

class Dashboard extends React.Component {
  static propTypes = {
    loadConfig: PropTypes.func,
  }

  state = {
    configPath: null,
  }

  componentWillMount() {
    if (this.props.configPath) {
      this.setState({
        configPath: this.props.configPath
      });
    }
    if (this.props.location.query && this.props.location.query.schemaUrl) {
      this.setState({
        configPath: this.props.location.query.schemaUrl
      }, () => {
        this.connectApp();
      });
    }
  }

  connectApp = () => {
    this.props.loadConfig(this.state.configPath);
  }

  submitForm = (e) => {
    e.preventDefault();
    this.connectApp();
  }

  render() {
    return (
      <div className="loginForm">
        <form onSubmit={this.submitForm}>
          <TextField
            hintText="Path to config"
            value={this.state.configPath}
            onChange={e => this.setState({ configPath: e.target.value })}
            required
          /><br />
          <RaisedButton
            type="submit"
            label="Connect"
            disabled={!this.state.configPath}
            primary
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  configPath: state.app.configPath,
});

export default connect(
  mapStateToProps,
  { loadConfig }
)(Dashboard);
