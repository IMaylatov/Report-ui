import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Box, IconButton } from '@material-ui/core';
import { Link } from "react-router-dom";
import LogoIcon from '../../common/icons/LogoIcon';
import { signinRedirect, signoutRedirect } from '../../../service/userService'
import { useSelector } from 'react-redux'
import LogoutIcon from '../../common/icons/LogoutIcon';

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
  },
  loginLink: {
    color: '#ffffff'
  }
}));

export default function ReportHeader(props) {
  const classes = useStyles();

  const user = useSelector(state => state.auth.user);
  
  let userInfo = user ?
    <Grid container direction='row' justify="space-between" alignItems="center">
      <Grid item>
        {user?.profile?.name}
      </Grid>
      <Grid item>
        <IconButton variant='contained' onClick={() => signoutRedirect(user)}>
          <LogoutIcon />
        </IconButton>
      </Grid>
    </Grid>    
  :
    <Button className={classes.loginLink} onClick={() => signinRedirect()}>Войти</Button>;

  return (
    <React.Fragment>
      <AppBar elevation={0} className={classes.header}>
        <Toolbar>
          <Grid container direction='row' justify="space-between" alignItems="center">
            <Grid item xs={10} container direction='row'>
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

            <Grid item xs={2}>
              <Box display="flex" justifyContent="flex-end">
                {userInfo}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}