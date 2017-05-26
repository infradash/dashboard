import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PubSub from 'pubsub-js';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../../config';
import { URL_HAS_TEMPLATE_RE, replaceValues } from '../../../utils/network';
import { createSchemaRequest } from '../../../core/schema';
import {
  FormView,
  ListView,
  TableView,
} from './templates';

export class CrudView extends React.Component {
  static propTypes = {
    subscriptions: PropTypes.array,
    componentName: PropTypes.string.isRequired,
    viewConfig: PropTypes.object.isRequired,
  };

  static contextTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.resource = _.get(this.props, ['viewConfig', 'actions', SCHEMA_INITIAL_ACTION_NAME], null);
    this.onModelChange = _.throttle(this.updateModel, 1000);
  }

  state = {
    model: null,
  };

  componentDidMount() {
    this.getViewModel();
    this.unsubscribeTokens = this.props.subscriptions.map(source => PubSub.subscribe(source, this.getViewModel));
  }

  componentWillUnmount() {
    this.unsubscribeTokens.forEach(token => PubSub.unsubscribe(token));
  }

  updateModel = (form) => {
    this.setState({ model: form.formData });
  }

  getViewModel = (msg, data) => {
    if (this.resource) {
      const url = replaceValues(this.resource.url, data);
      const resourcePathMissingData = new RegExp(URL_HAS_TEMPLATE_RE, 'g').test(url);
      if (!resourcePathMissingData) {
        const { responsePath } = this.props.viewConfig;
        const request = this.props.createSchemaRequest(Object.assign({}, this.resource, { url }), null, this.props.authHeader);
        request().then(response => {
          const model = responsePath ? _.get(response, responsePath) : response;
          this.setState({ model });
        }).catch(() => {
          this.setState({ model: null });
        });
      }
    }
  }

  getViewTemplate = (template: string) => {
    switch(template) {
      case 'list':
        return (
          <ListView
            model={this.state.model}
            viewConfig={this.props.viewConfig}
            componentName={this.props.componentName}
          />
        );
      case 'table':
        return (
          <div>
            <TableView
              model={this.state.model}
              viewConfig={this.props.viewConfig}
              componentName={this.props.componentName}
            />
          </div>
        );
      case 'form':
        return (
          <div>
            <FormView
              model={this.state.model}
              viewConfig={this.props.viewConfig}
              componentName={this.props.componentName}
              onModelChange={this.onModelChange}
            />
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    const template = _.get(this.props, ['viewConfig', 'template'], null);
    return (
      <div>{this.getViewTemplate(template)}</div>
    )
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
  mapDispatchToProps,
)(CrudView);
