import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import layoutStyles from 'styles/layout.css';

export const LoadingBar = ({ isLoading }) => (
  { ...isLoading ?
      <LinearProgress className={layoutStyles.loadingBar} mode="indeterminate" />
    : <div /> }
);

LoadingBar.propTypes = {
  isLoading: PropTypes.bool,
};
