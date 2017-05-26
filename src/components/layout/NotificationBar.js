import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

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
