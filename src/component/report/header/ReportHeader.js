import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import LogoIcon from '../../common/icons/LogoIcon';

const useStyles = makeStyles((theme) => ({
  header: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logoButton: {
    color: '#fff',
    paddingRight: 30,
    fontSize: 18,
    "&:hover": {
      backgroundColor: "transparent",
    }
  }
}));

export default function ReportHeader(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar elevation={0} className={classes.header}>
        <Toolbar>
          <Grid container direction='row'>
            <Grid item>
              <Button
                component={Link}
                to='/'
                disableRipple
                startIcon={<LogoIcon />}
                className={classes.logoButton}
              >
                {props.title}
              </Button>
            </Grid>

            {props.children}
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}