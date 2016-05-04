import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/lib/snackbar';

export const NotificationBar = ({ message, dismissNotification }) => (
  <Snackbar
    open={!!message}
    message={message || ''}
    autoHideDuration={4000}
    onRequestClose={dismissNotification}
  />
);

NotificationBar.propTypes = {
  dismissNotification: PropTypes.func,
  message: PropTypes.string,
};
