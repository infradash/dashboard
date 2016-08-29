import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export function ModalWindow(props) {
  const actions = props.showDefaultButtons ? (
    <FlatButton
      primary
      label="OK"
      onTouchTap={props.onModalClose}
    />
  ) : null;

  return (
    <Dialog
      modal
      autoScrollBodyContent
      open={!!props.text}
      actions={actions}
    >
      {props.text}
    </Dialog>
  );
}

ModalWindow.propTypes = {
  text: PropTypes.any,
  showDefaultButtons: PropTypes.bool,
  onModalClose: PropTypes.func,
};
