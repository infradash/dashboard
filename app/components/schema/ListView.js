import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import objectPath from 'object-path';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import layoutStyles from '../../styles/layout.css';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../config';


export default class ListView extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    methods: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  state = {
    model: [],
  }

  componentWillMount() {
    this.props.methods[SCHEMA_INITIAL_ACTION_NAME]()
      .then(model => {
        if (model && model.length > 0) {
          this.setState({ model });
        }
      });
  }

  render() {
    const { schema, location: { pathname } } = this.props;
    const { fields: { name, value, location } } = schema;
    return (
      <List>
        {this.state.model.map((entity, index) => {
          const query = {
            location,
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
}
