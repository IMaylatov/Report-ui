import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  beginPeriod: {
    paddingRight: theme.spacing(1)
  }
}));

export default function PeriodInputVariable(props) {
  const classes = useStyles();

  const handleBeginDateChange = (e) => {
    props.onChange({...props.variable, value: { beginDate: e.target.value, endDate: props.variable.value.endDate } });
  }

  const handleEndDateChange = (e) => {
    props.onChange({...props.variable, value: { beginDate: props.variable.value.beginDate, endDate: e.target.value } });
  }

  return (
    <React.Fragment>
       <TextField
        label="Начало периода"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.variable.value.beginDate}
        onChange={handleBeginDateChange}
        className={classes.beginPeriod}
      />
      <TextField
       label="Конец периода"
       type="date"
       InputLabelProps={{
         shrink: true,
       }}
       value={props.variable.value.endDate}
       onChange={handleEndDateChange}
     />
    </React.Fragment>
  );
}