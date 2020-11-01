import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, IconButton, Typography, Box } from '@material-ui/core';
import LogoutIcon from '../common/icons/LogoutIcon';
import { isIdentityScheme } from '../../service/authService';

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
    <Grid container direction='row-reverse' justify="space-between" alignItems="center" wrap="nowrap">
      <Grid item xs={2}>
        <IconButton variant='contained' onClick={() => props.logout()}>
          <LogoutIcon />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <Box display="flex" flexDirection="row-reverse" width={1}>
          <Typography>
            {user?.profile?.name}
          </Typography>     
        </Box>   
      </Grid>
    </Grid>    
  :
    isIdentityScheme() &&
      <Button className={classes.loginLink} onClick={() => props.signinRedirect()}>Войти</Button>
  )
}