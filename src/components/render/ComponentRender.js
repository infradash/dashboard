import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { bindActionCreators } from 'redux';
import { httpRequest } from '../../core/network';

import {
  CrudView,
  EventsView,
  VisualizationView
} from '../views/';

class ComponentRender extends React.Component {
  static propTypes = {
    events: PropTypes.object,
    name: PropTypes.string.isRequired,
    schemaPath: PropTypes.string.isRequired,
    httpRequest: PropTypes.func,
  }
  state = {
    schema: null,
  }
  componentDidMount() {
    this.loadSchema(this.props.schemaPath);
  }
  componentWillUnmount() {
    
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      schema: null
    }, () => {
      this.loadSchema(nextProps.schemaPath);
    });
  }
  loadSchema(path) {
    this.props.httpRequest(path).then(schema => {
      setTimeout(() => {
        this.setState({ schema });
      }, 1000);
    });
  }
  getComponentSubscriptions(eventsMap, componentName) {
    const subscriptions = [];
    _.forIn(eventsMap, (events, key) => {
      _.forIn(events, (targets, eventType) => {
        if (targets.some(eventTarget => eventTarget === componentName)) {
          subscriptions.push(`${key}.${eventType}`);
        }
      })
    });
    return subscriptions;
  }
  getComponent(schema) {
    const componentSubscriptions = this.getComponentSubscriptions(this.props.events, this.props.name);
    switch (schema.type) {
      case 'crud':
        return (
          <CrudView
            componentName={this.props.name}
            subscriptions={componentSubscriptions}
            viewConfig={schema.viewConfig}
          />
        )
      case 'events':
        return (
          <EventsView
            componentName={this.props.name}
            subscriptions={componentSubscriptions}
            viewConfig={schema.viewConfig}
          />
        )
      case 'visualization':
        return (
          <VisualizationView
            componentName={this.props.name}
            subscriptions={componentSubscriptions}
            viewConfig={schema.viewConfig}
          />
        )
      default:
        return null;
    }
  }
  render() {
    //console.log('render ', this.props.name);
    if (_.isEmpty(this.state.schema)) {
      return (
        <div className="loading-indicator">
          <RefreshIndicator
            size={40}
            left={0}
            top={0}
            status="loading"
          />
        </div>
      )
    }
    return this.getComponent(this.state.schema);
  }
}



const mapDispatchToProps = (dispatch) => ({
  httpRequest: bindActionCreators(httpRequest, dispatch)
});

export default connect(
  null,
  mapDispatchToProps,
)(ComponentRender);
