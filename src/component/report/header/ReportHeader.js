import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Box } from '@material-ui/core';
import { Link } from "react-router-dom";
import LogoIcon from '../../common/icons/LogoIcon';
import { AuthConsumer } from '../../../utils/providers/authProvider';
import UserHeader from '../../user/UserHeader';

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
    <AppBar elevation={0} className={classes.header}>
      <Toolbar>
        <Grid container direction='row' justify="space-between" alignItems="center">
          <Grid item xs={9} container direction='row'>
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

          <Grid item xs={3}>
            <Box display="flex" justifyContent="flex-end">
              <AuthConsumer>
                {({ isAuthenticated, getUser, signinRedirect, logout }) => {
                  return <UserHeader isAuthenticated={isAuthenticated()} getUser={getUser} 
                    signinRedirect={signinRedirect} logout={logout}/>;
                }}
              </AuthConsumer>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}