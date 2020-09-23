import React from 'react';
import { TextField } from '@material-ui/core';

export default function IntInputParameter(props) {
  const handleChange = (e) => {
    props.onChange({...props.parameter, value: e.target.value });
  }

  return (
    <React.Fragment>
      <TextField value={props.parameter.value} onChange={handleChange} label={props.parameter.label} required />
    </React.Fragment>
  );
}