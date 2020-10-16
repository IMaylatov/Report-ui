import React  from 'react';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

export default function ConnectionStringConnection(props) {  
  const handleConnectionStringChange = (e) => {
    props.value.connectionString = e.target.value;
    props.onChange({ ...props.value });
  }

  const disabletor = (name) => {
    return props.disabletor(`ConnectionStringConnection.${name}`);
  };

  return (    
    <FormControl fullWidth>
      <TextField value={props.value.connectionString} 
        onChange={handleConnectionStringChange} label='Строка подключения' required
        disabled={disabletor('connectionString')}/>
    </FormControl>
  );
}