import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ComponentRender } from '../components/render';

class ViewRender extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    appConfig: PropTypes.object.isRequired
  }
  shouldComponentUpdate(nextProps) {
    const oldQuery = this.props.location.query;
    const newQuery = nextProps.location.query;
    return oldQuery.template !== newQuery.template;
  }
  render() {
    const { appConfig, location } = this.props;
    const template = location.query.template; 
    const selectedTemplate = _.get(appConfig, ['templates', template], null);
    return (
      <div className="components-layout">
        {selectedTemplate.layout.map((component, index) => {
          const schemaPath = _.get(appConfig.registeredComponents, component.name, '');
          const events = _.get(selectedTemplate, ['events'], null);
          return (
            <div key={`${schemaPath}__${index}`} className="component-view" style={component.style}>
              <ComponentRender
                events={events}
                name={component.name}
                schemaPath={schemaPath}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appConfig: state.app.config,
});

export default connect(
  mapStateToProps,
)(ViewRender);

