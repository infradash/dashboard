import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import layoutStyles from 'styles/layout.css';
import { NAVIGATION_WIDTH } from 'config';

const menuItems = [
  { route: '/', text: 'Dashboard' },
  { route: '/accounts', text: 'Accounts' }
];

export function Navigation({ isOpen, selectedRoute }) {
  return (
    <LeftNav open={isOpen} width={NAVIGATION_WIDTH} className={layoutStyles.navigation}>
      <Menu autoWidth={false} width={NAVIGATION_WIDTH} value={selectedRoute}>
        {menuItems.map((item, key) => (
          <MenuItem
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
  selectedRoute: PropTypes.string
};
