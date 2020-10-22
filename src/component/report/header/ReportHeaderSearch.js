import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Box, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '../../common/icons/SearchIcon';
import ReportHeader from './ReportHeader';

const useStyles = makeStyles((theme) => ({
  searchField: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& .MuiIconButton-root': {
      padding: 5
    },
  }
}));

export default function ReportHeaderSearch(props) {
  const classes = useStyles();

  return (
    <ReportHeader title={props.title}>
      <Grid item xs={6}>
        <Box height={1} width={1} display="flex" alignItems="center">
          <Paper component="form" className={classes.searchField}>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <TextField
              value={props.searchText} onChange={(e) => props.onSearchTextChange(e.target.value)}
              fullWidth placeholder="Поиск" />
          </Paper>
        </Box>
      </Grid>
    </ReportHeader>
  );
}