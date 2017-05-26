import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import { Button } from '../components/layout';

import { connect } from 'react-redux';
import { loadConfig } from '../core/app';

class StartPage extends React.Component {
  static propTypes = {
    loadConfig: PropTypes.func,
  }

  state = {
    configPath: null,
  }

  componentDidMount() {
    if (this.props.configPath) {
      this.setState({
        configPath: this.props.configPath
      });
    }
    if (this.props.location.query && this.props.location.query.configPath) {
      this.setState({
        configPath: this.props.location.query.configPath
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
            value={this.state.configPath || ''}
            onChange={e => this.setState({ configPath: e.target.value })}
            required
          /><br />
          <Button
            type="submit"
            label="Connect"
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
)(StartPage);
