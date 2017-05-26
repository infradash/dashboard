import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import {
  showModalWindow,
  closeModalWindow,
} from '../../../core/app';
import { createSchemaRequest } from '../../../core/schema';
import { Button } from '../../../components/layout';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../../config';

class ViewToolbar extends React.Component {
  static propTypes = {
    viewConfig: PropTypes.object,
    model: PropTypes.any,
    authHeader: PropTypes.object,
    createSchemaRequest: PropTypes.func,
    showModalWindow: PropTypes.func,
    closeModalWindow: PropTypes.func,
  };

  displayMessage = (callback) => ({
    content: callback.message,
    callback: () => {
      this.props.closeModalWindow();
      if (callback.redirect) {
        hashHistory.push(callback.redirect);
      }
    },
  })

  sendRequest = (action) => {
    const {
      model,
      authHeader,
    } = this.props;
    const { callback = {} } = action;
    const request = this.props.createSchemaRequest(action, model, authHeader);
    const onSuccess = this.displayMessage(callback.success);
    const onFail = this.displayMessage(callback.fail);
    request(model)
      .then(() => this.props.showModalWindow(onSuccess))
      .catch(() => this.props.showModalWindow(onFail));
  }

  renderButton = (action, index) => (
    <Button
      key={index}
      label={action.label || action.method}
      onTouchTap={() => this.sendRequest(action)}
    />
  )

  render() {
    const { actions } = this.props.viewConfig;
    const buttons = Object.keys(actions).filter(name => name !== SCHEMA_INITIAL_ACTION_NAME);
    if (!buttons.length) {
      return null;
    }
    return (
      <Toolbar>
        <ToolbarGroup>
          {buttons.map((name, index) => this.renderButton(actions[name], index))}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const mapStateToProps = (state) => ({
  authHeader: state.app.authHeader,
});

const mapDispatchToProps = (dispatch) => ({
  createSchemaRequest: bindActionCreators(createSchemaRequest, dispatch),
  closeModalWindow: bindActionCreators(closeModalWindow, dispatch),
  showModalWindow: bindActionCreators(showModalWindow, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewToolbar);
