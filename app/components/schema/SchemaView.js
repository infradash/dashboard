import React, { PropTypes } from 'react';

import { stringCapitalize } from '../../utils';
import { createMethods, ListView, EditView } from '../../components/schema';

export function SchemaView(props) {
  const { methods, schema, location, schema: { type } } = props;
  const views = { EditView, ListView };
  const schemaViewName = `${stringCapitalize(type)}View`;
  const View = views[schemaViewName];
  return (
    <View
      location={location}
      methods={methods}
      schema={schema}
    />
  );
}

SchemaView.propTypes = {
  location: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  methods: PropTypes.object,
};

export default createMethods(props => ({
  params: props.location.query,
  actions: props.schema.actions,
}))(SchemaView);
