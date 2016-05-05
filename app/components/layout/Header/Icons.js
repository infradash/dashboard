import React, { PropTypes } from 'react';
import layoutStyles from 'styles/layout.css';
import CircularProgress from 'material-ui/lib/circular-progress';
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import Menu from 'material-ui/lib/svg-icons/navigation/menu';
import IconButton from 'material-ui/lib/icon-button';

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
