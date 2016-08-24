import React, { PropTypes } from 'react';
import objectPath from 'object-path';

import { List, ListItem } from 'material-ui/List';

import { Link } from 'react-router';
import layoutStyles from '../../../styles/layout.css';

export default function ListView(props) {
  const { schema, location: { pathname } } = props;
  const { fields: { name, value, schemaUrl } } = schema;
  return (
    <List>
      {props.model.map((entity, index) => {
        const query = {
          schemaUrl,
          [value]: objectPath.get(entity, value),
        };
        return (
          <ListItem
            key={index}
            innerDivStyle={{ padding: 0 }}
            children={
              <Link
                key={index}
                style={{ padding: 16 }}
                className={layoutStyles.menuLink}
                to={{ pathname, query }}
              >
                {objectPath.get(entity, name)}
              </Link>
            }
          />
        );
      })}
    </List>
  );
}

ListView.propTypes = {
  schema: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  model: PropTypes.any,
};
