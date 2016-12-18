import React, { PropTypes } from 'react';
import objectPath from 'object-path';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../styles/layout.css';
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
  ViewToolbar,
  AddView,
  EditView,
  ListView,
  TableView,
} from '../../components/schema';

export class SchemaView extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    schemaHttpParamsCache: PropTypes.object,
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
    return this.state.model !== nextState.model || this.props.schemaHttpParamsCache !== nextProps.schemaHttpParamsCache;
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
    return objectPath.get(props.schemaHttpParamsCache, path);
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
    const { schema } = props;
    const { actions } = schema;
    if (actions && actions[SCHEMA_INITIAL_ACTION_NAME]) {
      const initialAction = Object.assign({}, actions[SCHEMA_INITIAL_ACTION_NAME]);
      const cachedParams = this.getCachedParams(initialAction, props);
      if (initialAction.params && (typeof initialAction.params === 'string') && !cachedParams) {
        this.setHttpParams(initialAction);
      } else if (cachedParams) {
        initialAction.params = JSON.parse(cachedParams);
        this.loadModel(initialAction, props);
      } else {
        this.loadModel(initialAction, props);
      }
    } else {
      this.setState({ model: null });
    }
  }

  render() {
    const views = {
      AddView,
      EditView,
      ListView,
      TableView
    };
    const { location, schema } = this.props;
    const { type, actions, form: { responsePath } } = schema;
    const initialAction = actions[SCHEMA_INITIAL_ACTION_NAME];
    const schemaViewName = `${stringCapitalize(type)}View`;
    const View = views[schemaViewName];
    let model = this.state.model || [];
    if (responsePath && model && Object.keys(model).length) {
      model = objectPath.get(model, responsePath);
    }
    return (
      <div>
        <div className="buttonsMargin">
          <View
            model={model}
            location={location}
            actions={actions}
            schema={schema}
            onModelChange={this.onModelChange}
          />
        </div>
        <div className="actionButtons">
          <ViewToolbar
            {...this.props}
            model={this.state.model}
            onUpdateSchema={() => this.setHttpParams(initialAction)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authHeader: state.app.authHeader,
  schemaHttpParamsCache: state.app.schemaHttpParamsCache,
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
