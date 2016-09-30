import React, { PropTypes } from 'react';
import objectPath from 'object-path';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import layoutStyles from '../../styles/layout.css';
import { stringCapitalize } from '../../utils';
import { createRequestPromise } from '../../utils/network';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../config';
import { SchemaController } from './SchemaController';
import {
  showModalWindow,
  closeModalWindow,
  cacheHttpParams,
} from '../../core/app';
import {
  ViewActions,
  AddView,
  EditView,
  ListView,
 } from '../../components/schema';

export class SchemaView extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    cachedHttpParams: PropTypes.object,
    cacheHttpParams: PropTypes.func,
    showModalWindow: PropTypes.func,
    closeModalWindow: PropTypes.func,
  };

  constructor() {
    super();
    this.formValues = {};
  }

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
    return this.state.model !== nextState.model || this.props.cachedHttpParams !== nextProps.cachedHttpParams;
  }

  onModelChange = (val, key) => {
    const model = { ...this.state.model };
    objectPath.set(model, val, key);
    if (JSON.stringify(model) !== JSON.stringify(this.state.model)) {
      this.setState({ model });
    }
  }

  getCachedParams(action, props) {
    const path = [encodeURIComponent(action.url), action.method];
    return objectPath.get(props.cachedHttpParams, path);
  }

  setHttpParams({ url, method, params }) {
    createRequestPromise(params).then(response => {
      this.props.showModalWindow({
        content: (
          <AddView
            schema={response}
            onModelChange={(val, key) => this.updateHttpParams(val, key)}
          />
        ),
        callback: () => {
          this.props.cacheHttpParams(url, method, this.formValues);
          this.props.closeModalWindow();
        },
      });
    });
  }

  updateHttpParams(val, key) {
    objectPath.set(this.formValues, val, key);
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
      const action = Object.assign({}, actions[SCHEMA_INITIAL_ACTION_NAME]);
      const cachedParams = this.getCachedParams(action, props);
      if (action.params && (typeof action.params === 'string') && !cachedParams) {
        this.setHttpParams(action);
      } else if (cachedParams) {
        action.params = JSON.parse(cachedParams);
        this.loadModel(action, props);
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
    const action = actions[SCHEMA_INITIAL_ACTION_NAME];
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
            onUpdateSchema={() => this.setHttpParams(action)}
          />
        </div>
      );
    }
    return (
      <div>
        <div className={multipleActions ? layoutStyles.buttonsMargin : null}>
          <View
            model={this.state.model}
            location={location}
            actions={actions}
            schema={selectedSchema}
            onModelChange={this.onModelChange}
          />
        </div>
        {actionsButtons}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authHeader: state.app.authHeader,
  cachedHttpParams: state.app.cachedHttpParams,
});

const mapDispatchToProps = (dispatch) => ({
  cacheHttpParams: bindActionCreators(cacheHttpParams, dispatch),
  closeModalWindow: bindActionCreators(closeModalWindow, dispatch),
  showModalWindow: bindActionCreators(showModalWindow, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SchemaView);
