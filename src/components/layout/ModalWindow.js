import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export class ModalWindow extends React.Component {
  static propTypes = {
    params: PropTypes.object,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.params !== nextProps.params;
  }

  render() {
    const {
      visible,
      content,
      showButtons,
      onModalCloseCallback,
    } = this.props.params || {};
    const actions = showButtons ? (
      <FlatButton
        primary
        label="OK"
        onTouchTap={onModalCloseCallback}
      />
    ) : null;

    return (
      <Dialog
        modal
        autoScrollBodyContent
        open={!!visible}
        actions={actions}
      >
        {content}
      </Dialog>
    );
  }
}
