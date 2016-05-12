import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import layoutStyles from 'styles/layout.css';
import { NAVIGATION_WIDTH } from 'config';

export function Navigation(props) {
  const {
    open,
    docked,
    routes,
    location,
    isDesktop,
    onChangeList,
    onRequestChange,
  } = props;

  const menuItems = routes.filter(route => route.path !== '/login')
    .map(route => ({
      path: route.path,
      name: route.name ? route.name : route.path.substr(1),
    }));

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
            value={item.path}
            onTouchTap={onChangeList}
            children={<Link className={layoutStyles.menuLink} to={item.path}>{item.name}</Link>}
          />
        ))}
      </Menu>
    </LeftNav>
  );
}

Navigation.propTypes = {
  routes: PropTypes.array,
  open: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  location: PropTypes.string,
  isDesktop: PropTypes.bool,
  onChangeList: PropTypes.func,
  onRequestChange: PropTypes.func,
};
