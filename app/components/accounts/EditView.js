import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import { SchemaForm } from 'react-schema-form';


export function EditView({
  schema,
  model,
  schemaActions,
  onClose,
  onChange,
  isOpen = false,
}) {
  return (
    <Dialog
      autoScrollBodyContent
      actions={schemaActions}
      open={isOpen}
      onRequestClose={onClose}
    >
      <SchemaForm
        schema={schema}
        model={model}
        onModelChange={onChange}
      />
    </Dialog>
  );
}

EditView.propTypes = {
  model: PropTypes.object,
  schema: PropTypes.object,
  schemaActions: PropTypes.array,
  isOpen: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
