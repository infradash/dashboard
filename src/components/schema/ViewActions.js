import React, { PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EditButton from 'material-ui/svg-icons/editor/mode-edit';
import { SchemaController } from './SchemaController';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar';

import { showModalWindow, closeModalWindow } from '../../core/app';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../config';
import '../../styles/layout.css';

class ViewActions extends React.Component {
  static propTypes = {
    authHeader: PropTypes.object,
    actions: PropTypes.object,
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
    const request = SchemaController.actionCreator(action, location, authHeader);
    const onSuccess = this.displayMessage(callback.success);
    const onFail = this.displayMessage(callback.fail);
    request(model)
      .then(() => this.props.showModalWindow(onSuccess))
      .catch(() => this.props.showModalWindow(onFail));
  }

  renderActionButton = (action, index) => {
    const { label, method, subview } = action;
    const { pathname } = this.props.location;
    const query = Object.assign({}, this.props.location.query, {
      subview: JSON.stringify(subview),
    });
    const isSubviewAvailable = subview && !this.props.location.query.subview;
    const LinkToSubView = (
      <Link
        className="buttonLink"
        key={index}
        to={{ pathname, query }}
      >
        <RaisedButton
          secondary
          label={label || method}
        />
      </Link>
    );
    const ActionButton = (
      <RaisedButton
        primary
        key={index}
        label={label || method}
        onTouchTap={() => this.sendRequest(action)}
      />
    );
    return isSubviewAvailable ? LinkToSubView : ActionButton;
  }

  render() {
    const { schema, location } = this.props;
    const { actions } = schema[location.query.schemaUrl];
    const editParamsHandler = (
      <div>
        <ToolbarSeparator />
        <FlatButton
          label="Edit HTTP params"
          labelPosition="before"
          onClick={this.props.onUpdateSchema}
          icon={<EditButton />}
        />
      </div>
    );
    const showEditParamsHandler = typeof actions[SCHEMA_INITIAL_ACTION_NAME].params === 'string' ? editParamsHandler : null;
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Actions" />
          {showEditParamsHandler}
          <ToolbarSeparator style={{ marginLeft: 0 }} />
            {Object.keys(actions)
              .filter(name => name !== SCHEMA_INITIAL_ACTION_NAME)
              .map((name, index) => this.renderActionButton(actions[name], index))}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const mapStateToProps = (state) => ({
  authHeader: state.app.authHeader,
});

const mapDispatchToProps = (dispatch) => ({
  showModalWindow: bindActionCreators(showModalWindow, dispatch),
  closeModalWindow: bindActionCreators(closeModalWindow, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewActions);
