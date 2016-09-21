import React, { PropTypes } from 'react';
import objectPath from 'object-path';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import layoutStyles from '../../styles/layout.css';
import { stringCapitalize } from '../../utils';
import { createRequestPromise } from '../../utils/network';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../config';
import { SchemaController } from './SchemaController';
import { showModalWindow } from '../../core/app';
import {
  ViewActions,
  HttpParamsForm,
  AddView,
  EditView,
  ListView,
 } from '../../components/schema';

export class SchemaView extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    showModalWindow: PropTypes.func,
  };

  state = {
    model: null,
  };

  componentWillMount() {
    this.validateSchema(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.validateSchema(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.model !== nextState.model;
  }

  onModelChange = (val, key) => {
    const model = { ...this.state.model };
    objectPath.set(model, val, key);
    if (JSON.stringify(model) !== JSON.stringify(this.state.model)) {
      this.setState({ model });
    }
  }

  loadModel(action, props) {
    const request = SchemaController.actionCreator(action, props.location, props.authHeader);
    request().then(model => {
      this.setState({ model });
    });
  }

  validateSchema(props) {
    let selectedSchema = props.schema[props.location.query.schemaUrl];
    if (props.location.query.subview) {
      const subview = JSON.parse(props.location.query.subview);
      selectedSchema = props.schema[subview.schemaUrl];
    }

    const { actions } = selectedSchema;
    if (actions && actions[SCHEMA_INITIAL_ACTION_NAME]) {
      const action = actions[SCHEMA_INITIAL_ACTION_NAME];
      if (action.params && (typeof action.params === 'string')) {
        createRequestPromise(action.params).then(response => {
          this.props.showModalWindow({
            content: <HttpParamsForm schema={response} />,
          });
        });
      } else {
        this.loadModel(action, props);
      }
    } else {
      this.setState({ model: null });
    }
  }

  render() {
    const views = { EditView, ListView, AddView };
    const { location, schema } = this.props;
    let selectedSchema = schema[location.query.schemaUrl];
    const { actions } = selectedSchema;
    if (location.query.subview) {
      const subview = JSON.parse(location.query.subview);
      selectedSchema = schema[subview.schemaUrl];
    }
    const { type } = selectedSchema;
    const schemaViewName = `${stringCapitalize(type)}View`;
    const View = views[schemaViewName];
    const multipleActions = Object.keys(actions).length > 1;
    let actionsButtons = null;
    if (multipleActions) {
      actionsButtons = (
        <div className={layoutStyles.actionButtons}>
          <ViewActions
            {...this.props}
            model={this.state.model}
          />
        </div>
      );
    }
    return (
      <div>
        {actionsButtons}
        <div className={multipleActions ? layoutStyles.buttonsMargin : null}>
          <View
            model={this.state.model}
            location={location}
            actions={actions}
            schema={selectedSchema}
            onModelChange={this.onModelChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authHeader: state.app.authHeader,
});

const mapDispatchToProps = (dispatch) => ({
  showModalWindow: bindActionCreators(showModalWindow, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SchemaView);
