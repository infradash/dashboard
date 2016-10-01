import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { SchemaForm } from 'react-schema-form';

export default function AddView(props) {
  return (
    <Card>
      <CardText>
        <SchemaForm
          schema={props.schema.form}
          onModelChange={props.onModelChange}
        />
      </CardText>
    </Card>
  );
}

AddView.propTypes = {
  onModelChange: PropTypes.func,
  schema: PropTypes.object,
};
