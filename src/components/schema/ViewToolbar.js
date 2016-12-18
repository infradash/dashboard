import React, { PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EditButton from 'material-ui/svg-icons/editor/mode-edit';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar';

import { createSchemaRequest } from '../../core/schema';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../config';
import '../../styles/layout.css';

class ViewToolbar extends React.Component {
  static propTypes = {
    authHeader: PropTypes.object,
    schema: PropTypes.object,
    model: PropTypes.any,
    onUpdateSchema: PropTypes.func,
    showModalWindow: PropTypes.func,
    closeModalWindow: PropTypes.func,
    location: PropTypes.object,
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
      location,
      authHeader,
    } = this.props;
    const { callback = {} } = action;
    const request = this.props.createSchemaRequest(action, location, authHeader);
    const onSuccess = this.displayMessage(callback.success);
    const onFail = this.displayMessage(callback.fail);
    request(model)
      .then(() => this.props.showModalWindow(onSuccess))
      .catch(() => this.props.showModalWindow(onFail));
  }

  renderButton = (action, index) => {
    const { label, method } = action;
    const isSubviewAvailable = action.schemaUrl;
    let button = null;
    if (isSubviewAvailable) {
      const { pathname } = this.props.location;
      const query = {
        schemaUrl: action.schemaUrl
      };
      button = (
        <Link
          className="buttonLink"
          key={index}
          to={{ pathname, query }}
        >
          <RaisedButton
            secondary
            label={label || action.schemaUrl}
          />
        </Link>
      );
    } else {
      button = (
        <RaisedButton
          primary
          key={index}
          label={label || method}
          onTouchTap={() => this.sendRequest(action)}
        />
      );
    }
    return button;
  }

  render() {
    const { actions, subview } = this.props.schema;
    const initialAction = actions[SCHEMA_INITIAL_ACTION_NAME];
    const schemaActions = subview ? Object.assign({}, actions, { subview }) : actions;
    const buttonsLabels = Object.keys(schemaActions).filter(name => name !== SCHEMA_INITIAL_ACTION_NAME);
    const displayEditHttpParams = initialAction && typeof initialAction.params === 'string';

    const toolbarPanel = !buttonsLabels.length ? null : (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Actions" />
          {displayEditHttpParams && <ToolbarSeparator />}
          {displayEditHttpParams && <FlatButton
            label="Edit HTTP params"
            labelPosition="before"
            onClick={this.props.onUpdateSchema}
            icon={<EditButton />}
          />}
          <ToolbarSeparator style={{ marginLeft: 0 }} />
          {buttonsLabels.map((name, index) => this.renderButton(schemaActions[name], index))}
        </ToolbarGroup>
      </Toolbar>
    );

    return toolbarPanel;
  }
}

const mapStateToProps = (state) => ({
  authHeader: state.app.authHeader,
});

const mapDispatchToProps = (dispatch) => ({
  createSchemaRequest: bindActionCreators(createSchemaRequest, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewToolbar);
