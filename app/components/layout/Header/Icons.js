import React, { PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Menu from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';

import layoutStyles from '../../../styles/layout.css';

export const LeftIcon = () => (
  <IconButton className={layoutStyles.buttonStyle} disabled>
    <ChevronRight color="#fff" />
  </IconButton>
);

export const ProgressIcon = () => (
  <CircularProgress color="#fff" size={0.4} mode="indeterminate" />
);

export const MenuIcon = (props) => (
  <IconButton onClick={props.onClick} className={layoutStyles.buttonStyle}>
    <Menu color="#fff" />
  </IconButton>
);

MenuIcon.propTypes = {
  onClick: PropTypes.func,
};
