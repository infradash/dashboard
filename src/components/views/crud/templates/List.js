import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PubSub from 'pubsub-js';
import { List, ListItem, makeSelectable } from 'material-ui/List';
const SelectableList = makeSelectable(List);

export default class ListView extends React.Component {
  componentEvents = {
    ON_SELECT: 'onSelect'
  }
  handleRequestChange = (event, index) => { 
    const publisher = `${this.props.componentName}.${this.componentEvents.ON_SELECT}`;
    PubSub.publish(publisher, {
      id: index
    });
  };
  render() {
    const { schema: { namePath, valuePath } } = this.props.viewConfig;
    return (
      <SelectableList onChange={this.handleRequestChange}>
        {Array.isArray(this.props.model) && this.props.model.map((entity, index) => {
          return (
            <ListItem
              key={index}
              value={_.get(entity, valuePath)}
              primaryText={_.get(entity, namePath)}
            />
          )
        })}
      </SelectableList>
    );
  }
}
ListView.propTypes = {
  model: PropTypes.any,
  componentName: PropTypes.string.isRequired,
  viewConfig: PropTypes.object.isRequired,
};