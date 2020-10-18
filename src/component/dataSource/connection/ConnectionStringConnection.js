import React  from 'react';
import { TextField, FormControl, Grid } from '@material-ui/core';

export default function ConnectionStringConnection(props) {  
  const handleConnectionStringChange = (e) => {
    props.value.connectionString = e.target.value;
    props.onChange({ ...props.value });
  }

  const disabletor = (name) => {
    return props.disabletor(`ConnectionStringConnection.${name}`);
  };

  return (  
    <Grid item xs={12}>
      <FormControl fullWidth>
        <TextField value={props.value.connectionString} 
          onChange={handleConnectionStringChange} label='Строка подключения' required
          disabled={disabletor('connectionString')}/>
      </FormControl>
    </Grid>  
  );
}