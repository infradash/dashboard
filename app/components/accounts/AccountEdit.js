import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import { SchemaForm } from 'react-schema-form';


export function AccountEdit({
  schema,
  selectedAccount,
  actions,
  onClose,
  onChange,
  isOpen = false,
}) {
  return (
    <Dialog
      autoScrollBodyContent
      actions={actions}
      open={isOpen}
      onRequestClose={onClose}
    >
      <SchemaForm
        schema={schema}
        model={selectedAccount}
        onModelChange={onChange}
      />
    </Dialog>
  );
}

AccountEdit.propTypes = {
  selectedAccount: PropTypes.object,
  schema: PropTypes.object,
  actions: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
