import React from 'react';
import { TextField } from '@material-ui/core';

export default function DateInputVariable(props) {
  const handleChange = (e) => {
    props.onChange({...props.variable, value: e.target.value });
  }

  return (
    <React.Fragment>
      <TextField
        type="date"
        value={props.variable.value}
        onChange={handleChange} label={props.variable.label}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </React.Fragment>
  );
}