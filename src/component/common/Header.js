import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import LogoIcon from './icons/LogoIcon';

const useStyles = makeStyles((theme) => ({
  logoButton: {
    color: '#fff',
    fontSize: 18,
    "&:hover": {
      backgroundColor: "transparent",
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar elevation={0}>
        <Toolbar>      
          <Button
            component={Link}
            to='/'
            disableRipple
            startIcon={<LogoIcon />}
            className={classes.logoButton}
          >
            Отчеты
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}