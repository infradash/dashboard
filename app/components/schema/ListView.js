import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const getObjReference = (obj, path) => new Function('_', `return _.${path}`)(obj);
// refactor

export function ListView({ model, schema, onTouchTap }) {
  return (
    <List>
      {model.map((entity, index) => {
        const { name, value } = schema;
        return (
          <ListItem
            key={index}
            value={[value, getObjReference(entity, value)]}
            primaryText={getObjReference(entity, name)}
            onTouchTap={onTouchTap}
          />
        );
      })}
    </List>
  );
}

ListView.propTypes = {
  schema: PropTypes.object.isRequired,
  model: PropTypes.array.isRequired,
  onTouchTap: PropTypes.func.isRequired,
};
