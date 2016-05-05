import React, { PropTypes } from 'react';
import Menu from 'material-ui/lib/svg-icons/navigation/menu';
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/lib/icon-button';
import layoutStyles from 'styles/layout.css';

const LeftIcon = ({ isAuthenticated, onClick }) => {
  const icon = isAuthenticated ? <Menu color="#fff" /> : <ChevronRight color="#fff" />;
  return (
    <IconButton
      onClick={onClick}
      className={layoutStyles.buttonStyle}
      disabled={!isAuthenticated}
    >
      {icon}
    </IconButton>
  );
};

LeftIcon.propTypes = {
  isAuthenticated: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LeftIcon;
