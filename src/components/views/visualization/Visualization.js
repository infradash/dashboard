import React from 'react';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderNetwork, renderTree } from './templates';
import { httpRequest } from '../../../core/network';

class VisualizationView extends React.Component {
  componentEvents = {
    ON_SELECT: 'onSelect'
  }
  onNodeSelect = (name) => { 
    const publisher = `${this.props.componentName}.${this.componentEvents.ON_SELECT}`;
    PubSub.publish(publisher, { name });
    //console.log(name);
  };
  componentDidMount() {
    this.parseSchema(this.props);
  }
  componentWillUpdate(props) {
    this.parseSchema(props);
  }
  parseSchema(props) {
    const { dataSrc, template } = props.viewConfig;
    this.props.httpRequest(dataSrc).then(data => {
      switch (template) {
        case 'tree':
          renderTree(data, this.el, this.onNodeSelect);
          break;
        case 'network':
          renderNetwork(data, this.el);
          break;
        default:
          break;
      }
    });
  }
  render() {
    return (
      <div className="visualization" ref={(div) => { this.el = div; }} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    httpRequest: bindActionCreators(httpRequest, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(VisualizationView);
