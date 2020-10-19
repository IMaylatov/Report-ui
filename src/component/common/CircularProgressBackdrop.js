import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loader: {
    zIndex: theme.zIndex.snackbar + 1,
  }
}));

export default function CircularProgressBackdrop(props) {
  const classes = useStyles();

  return (
    <Backdrop open={props.open} className={classes.loader}>
      <CircularProgress />
    </Backdrop>
  );
}