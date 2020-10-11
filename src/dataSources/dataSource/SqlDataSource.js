import React  from 'react';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

export default function SqlDataSource(props) {
  const handleConnectionStringChange = (e) => {
    props.value.data.connectionString = e.target.value;
    props.onChange({ ...props.value });
  }

  return (
    <React.Fragment>
      <FormControl fullWidth>
        <TextField value={props.value.data.connectionString} onChange={handleConnectionStringChange} label='Строка подключения' required/>
      </FormControl>
    </React.Fragment>
  );
}