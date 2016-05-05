import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

const ProgressIndicator = () => (
  <CircularProgress size={0.4} color="#fff" mode="indeterminate" />
);

ProgressIndicator.propTypes = {
  isAuthenticated: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ProgressIndicator;
