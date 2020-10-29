import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, IconButton } from '@material-ui/core';
import LogoutIcon from '../common/icons/LogoutIcon';

const useStyles = makeStyles((theme) => ({
  loginLink: {
    color: '#ffffff'
  }
}));

export default function UserHeader(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { getUser } = props;

  useEffect(() => {
    if (props.isAuthenticated) {
      getUser()
        .then(user => setUser(user));
    }
  }, [props.isAuthenticated, getUser]);

  return (props.isAuthenticated ?
    <Grid container direction='row' justify="space-between" alignItems="center">
      <Grid item>
        {user?.profile?.name}
      </Grid>
      <Grid item>
        <IconButton variant='contained' onClick={() => props.logout()}>
          <LogoutIcon />
        </IconButton>
      </Grid>
    </Grid>    
  :
    <Button className={classes.loginLink} onClick={() => props.signinRedirect()}>Войти</Button>)
}