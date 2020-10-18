import React from 'react';
import logo from '../../../assets/images/logo.svg';

export default function LogoIcon(props) {
  return (
    <img src={logo} className="App-logo" style={{height: 40, pointerEvents: 'none' }} alt='logo'/>
  );
}