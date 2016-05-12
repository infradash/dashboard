import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

export function ModalWindow(props) {
  return (
    <Dialog
      modal
      open={!!props.text}
      actions={<FlatButton
        primary
        label="OK"
        onTouchTap={props.onModalClose}
      />}
    >
      {props.text}
    </Dialog>
  );
}

ModalWindow.propTypes = {
  text: PropTypes.string,
  onModalClose: PropTypes.func,
};
