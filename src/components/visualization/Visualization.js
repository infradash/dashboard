import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { httpRequest } from '../../core/network';
import { renderNetwork, renderTree } from './views';
import '../../styles/visualization.css';

class VisualizationView extends Component {
  componentWillMount() {
    this.parseSchema(this.props);
  }
  componentWillUpdate(props) {
    this.parseSchema(props);
  }
  parseSchema(props) {
    const { dataSrc, view } = props.viewConfig;
    props.httpRequest(dataSrc).then(data => {
      switch (view) {
        case 'tree':
          renderTree(data, this.el);
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
