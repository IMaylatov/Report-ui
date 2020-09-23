import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const initialPositionMouse = {
  mouseX: null,
  mouseY: null,
};

export default function useContextMenu(props) {
  const [mousePosition, setMousePosition] = useState(initialPositionMouse);

  const handleMenuItemClick = (item) => {
    item.onClick();
  }

  const handleMenuOpen = (e) => {
    e.preventDefault();
    setMousePosition({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  }

  const handleMenuClose = () => {
    setMousePosition(initialPositionMouse);
  }

  const menu = 
    <Menu
      keepMounted
      open={mousePosition.mouseY !== null}
      onClose={handleMenuClose}
      anchorReference="anchorPosition"
      anchorPosition={
        mousePosition.mouseY !== null && mousePosition.mouseX !== null
          ? { top: mousePosition.mouseY, left: mousePosition.mouseX }
          : undefined
      }
    >
      {props.items.map((item, i) => {
        return <MenuItem key={i} onClick={(e) => handleMenuItemClick(item)}>{item.label}</MenuItem>
      })}
    </Menu>;

  return [menu, handleMenuOpen, handleMenuClose];
}