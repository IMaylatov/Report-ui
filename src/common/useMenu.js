import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function useMenu(props) {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    handleMenuClose();
    item.onClick();
  }

  const menu = 
    <React.Fragment>
      <Button onClick={handleMenuClick} {...props.menuButton.props}>
        {props.menuButton.label}
      </Button>
      <Menu
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        {props.items.map((item, i) => {
          let menuItemProps = { ...item.props };
          if (item.onClick) {
            menuItemProps = { onClick: (e) => handleMenuItemClick(item) };
          }
          return <MenuItem key={i} component='button' {...menuItemProps}>{item.label}</MenuItem>
        })}
      </Menu>
    </React.Fragment>;

  return menu;
}