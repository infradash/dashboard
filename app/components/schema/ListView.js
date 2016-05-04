import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { getProperty } from 'utils';

export function ListView({ model, schema, onTouchTap }) {
  return (
    <List>
      {model.map((entity, index) => {
        const { name, value, location } = schema;
        const data = JSON.stringify({
          location,
          params: {
            [value]: getProperty(value, entity),
          },
        });
        return (
          <ListItem
            key={index}
            value={data}
            primaryText={getProperty(name, entity)}
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
