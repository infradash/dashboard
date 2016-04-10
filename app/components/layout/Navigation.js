import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import layoutStyles from 'styles/layout.css';
import { NAVIGATION_WIDTH } from 'config';

const menuItems = [
  { route: '/dashboard', text: 'Dashboard' },
  { route: '/accounts', text: 'Accounts' }
];

export function Navigation({ isOpen, url }) {
  return (
    <LeftNav
      open={isOpen}
      docked
      width={NAVIGATION_WIDTH}
      className={layoutStyles.marginTop}
    >
      <Menu
        desktop
        autoWidth={false}
        width={NAVIGATION_WIDTH}
        value={url}
      >
        {menuItems.map((item, key) => (
          <MenuItem
            desktop
            key={key}
            value={item.route}
            children={<Link className={layoutStyles.menuLink} to={item.route}>{item.text}</Link>}
          />
        ))}
      </Menu>
    </LeftNav>
  );
}

Navigation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  url: PropTypes.string
};
