/* eslint no-param-reassign: ["error", { "props": false }]*/
import React, { PropTypes } from 'react';
import equal from 'deep-equal';
import connect from 'utils/api-connector';
import { buildUrl } from 'utils';
import { ListView, EditView } from 'components/schema';

const params = {};

const createRequest = (actionObject, action) => {
  const url = buildUrl(actionObject.url, params);
  if (action === 'default') {
    return url;
  }
  return (data) => ({
    response: {
      url,
      method: actionObject.method,
      body: JSON.stringify(data),
    },
  });
};

const mapActions = (props) => {
  const actions = props.schemaObject.actions ? Object.keys(props.schemaObject.actions) : [];
  return actions.reduce((actionsMap, action) => {
    const actionObject = props.schemaObject.actions[action];
    actionsMap[action] = createRequest(actionObject, action);
    return actionsMap;
  }, {});
};

// refactor

class SchemaParser extends React.Component {
  static propTypes = {
    schemaObject: PropTypes.object.isRequired,
    updateSchema: PropTypes.func.isRequired,
    default: PropTypes.object,
  }

  shouldComponentUpdate(nextProps) {
    return equal(this.props.schemaObject, nextProps.schemaObject);
  }

  handleListItemSelect = (evt) => {
    const { value } = evt.currentTarget.attributes.value;
    const elementData = JSON.parse(value);
    this.props.updateSchema(elementData.location);
    Object.keys(elementData.params).forEach(paramName => {
      params[paramName] = elementData.params[paramName];
    });
  }

  render() {
    let output;
    const { value } = this.props.default;
    const { type, schema, actions } = this.props.schemaObject;
    switch (type) {
      case 'edit': {
        const actionsMap = Object.keys(actions)
          .filter(action => action !== 'default')
          .map(action => ({
            name: actions[action].label || actions[action].method,
            fn: this.props[action],
          }));

        output = (
          <EditView
            schema={schema}
            model={value}
            actions={actionsMap}
          />
        );
        break;
      }
      case 'list':
      default: {
        output = (
          <ListView
            schema={schema}
            model={value || []}
            onTouchTap={this.handleListItemSelect}
          />
        );
        break;
      }
    }
    return output;
  }
}

export default connect(props => (mapActions(props)))(SchemaParser);
