import React from 'react';
import { TextField, Grid } from '@material-ui/core';

export default function PeriodInputVariable(props) {
  const handleBeginDateChange = (e) => {
    props.onChange({...props.variable, value: { beginDate: e.target.value, endDate: props.variable.value.endDate } });
  }

  const handleEndDateChange = (e) => {
    props.onChange({...props.variable, value: { beginDate: props.variable.value.beginDate, endDate: e.target.value } });
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <TextField
          label="Начало периода"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.variable.value.beginDate}
          onChange={handleBeginDateChange}
        />
      </Grid>
      <Grid item>
        <TextField
        label="Конец периода"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.variable.value.endDate}
        onChange={handleEndDateChange}
      />
      </Grid>
    </Grid>
  );
}