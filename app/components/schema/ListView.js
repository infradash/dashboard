import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { getProperty } from 'utils';
import { SCHEMA_INITIAL_ACTION_NAME } from 'config';

export default function ListView({ methods, schema, onTouchTap }) {
  const { fields: { name, value, location } } = schema;
  const model = methods[SCHEMA_INITIAL_ACTION_NAME] || [];
  return (
    <List>
      {model.map((entity, index) => {
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
  methods: PropTypes.object.isRequired,
  onTouchTap: PropTypes.func.isRequired,
};
