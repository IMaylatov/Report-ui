import React from 'react';
import { TextField } from '@material-ui/core';

export default function StringInputVariable(props) {
  const handleChange = (e) => {
    props.onChange({...props.variable, value: e.target.value });
  }

  return (
    <React.Fragment>
      <TextField value={props.variable.value} onChange={handleChange} label={props.variable.label} required />
    </React.Fragment>
  );
}