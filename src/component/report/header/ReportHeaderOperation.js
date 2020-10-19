import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import ReportHeader from './ReportHeader';

const useStyles = makeStyles((theme) => ({
  nameField: {    
    width: 400,
    paddingBottom: 1.5,
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: '#ffffff',
        paddingTop: 3.5,
        paddingBottom: 3.5,
        paddingLeft: 5
      },
      '&:hover fieldset': {
        borderColor: '#a9b7c4',
      },
      '&:not(hover) fieldset': {
        borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#a9b7c4',
      },
    }
  },
  menuButton: {
    color: '#ffffff',
    textTransform: 'none',
    fontSize: 14,
    padding: '2px  5px'
  }
}));

export default function ReportHeaderOperation(props) {
  const classes = useStyles();

  const handleNameChange = (e) => {
    props.report.name = e.target.value;
    props.onChange(props.report);
  }

  return (
    <ReportHeader>
      <Grid item xs={6} container direction="column">
        <Grid item>
          <TextField value={props.report.name} onChange={handleNameChange} 
            required
            variant="outlined"
            className={classes.nameField}/>
        </Grid>

        <Grid item>
          <Button type="submit" className={classes.menuButton}>Сохранить</Button>
          <Button onClick={props.onRunClick} className={classes.menuButton}>Запустить</Button>
        </Grid>
      </Grid>
    </ReportHeader>
  );
}