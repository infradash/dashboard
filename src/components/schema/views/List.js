import React, { PropTypes } from 'react';
import objectPath from 'object-path';

import { List, ListItem } from 'material-ui/List';

import { Link } from 'react-router';
import '../../../styles/layout.css';

export default function ListView(props) {
  const { schema, location: { pathname } } = props;
  const { form: { namePath, valuePath, schemaUrl, responsePath } } = schema;
  let model = props.model || [];
  if (responsePath && Object.keys(model).length) {
    model = objectPath.get(model, responsePath)
  }
  return (
    <List>
      {model.map((entity, index) => {
        const label = objectPath.get(entity, namePath);
        const query = {
          schemaUrl,
          [valuePath]: objectPath.get(entity, valuePath),
        };
        if (!schemaUrl) {
          return (
            <ListItem key={index} disabled>
              {label}
            </ListItem>
          )
        } else {
          return (
            <ListItem
              key={index}
              innerDivStyle={{ padding: 0 }}
              children={
                <Link
                  className="menuLink"
                  key={index}
                  style={{ padding: 16 }}
                  to={{ pathname, query }}
                >
                  {label}
                </Link>
              }
            />
          )
        }
      })}
    </List>
  );
}

ListView.propTypes = {
  schema: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  model: PropTypes.any,
};
