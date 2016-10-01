import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { SchemaForm } from 'react-schema-form';

export default function EditView(props) {
  let form = null;
  if (props.model) {
    form = (
      <Card>
        <CardText>
          <SchemaForm
            model={props.model}
            schema={props.schema.form}
            onModelChange={props.onModelChange}
          />
        </CardText>
      </Card>
    );
  }
  return form;
}

EditView.propTypes = {
  onModelChange: PropTypes.func,
  schema: PropTypes.object,
  model: PropTypes.object,
};
