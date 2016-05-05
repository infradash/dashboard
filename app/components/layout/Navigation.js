import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import layoutStyles from 'styles/layout.css';
import { NAVIGATION_WIDTH } from 'config';

const menuItems = [
  { route: '/dashboard', text: 'Dashboard' },
  { route: '/accounts', text: 'Accounts' },
];

export function Navigation({
  open,
  docked,
  location,
  isDesktop,
  onChangeList,
  onRequestChange,
}) {
  return (
    <LeftNav
      open={open}
      docked={docked}
      width={NAVIGATION_WIDTH}
      className={layoutStyles.marginTop}
      onRequestChange={onRequestChange}
    >
      <Menu
        desktop={isDesktop}
        value={location}
      >
        {menuItems.map((item, key) => (
          <MenuItem
            key={key}
            value={item.route}
            onTouchTap={onChangeList}
            children={<Link className={layoutStyles.menuLink} to={item.route}>{item.text}</Link>}
          />
        ))}
      </Menu>
    </LeftNav>
  );
}

Navigation.propTypes = {
  open: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  location: PropTypes.string,
  isDesktop: PropTypes.bool,
  onChangeList: PropTypes.func,
  onRequestChange: PropTypes.func,
};
