import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 12
  },
  logoButton: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  logoIcon: {
    fontSize: 40
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" color='inherit'>
        <Toolbar className={classes.root}>      
          <IconButton component={Link} to='/' color="inherit" className={classes.logoButton}>
            <HomeIcon className={classes.logoIcon}/>
          </IconButton>
          <Typography>
            Отчеты
          </Typography>          
      </Toolbar>
    </AppBar>
  );
}