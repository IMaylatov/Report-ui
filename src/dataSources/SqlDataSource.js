import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { CONNECTION_TYPES, CONNECTION_TYPE_CONNECTION_STRING } from '../constants';
import MenuItem from '@material-ui/core/MenuItem';
import ConnectionStringConnection from './connection/ConnectionStringConnection';

const useStyles = makeStyles((theme) => ({
  formField: {
    width: 200
  }
}));

export default function SqlDataSource(props) {
  const classes = useStyles();

  const handleConnectionTypeChange = (e) => {
    props.value.data.connectionType = e.target.value;
    switch(props.value.data.connectionType) {
      case CONNECTION_TYPE_CONNECTION_STRING.name:
        props.value.data.connectionString = '';
        break;
      default:
        break;
    }
    props.onChange({ ...props.value });
  }
  
  const handleDataChange = (data) => {
    props.value.data = data;
    props.onChange({ ...props.value });
  }

  const disabletor = (name) => {
    return props.disabletor(`SqlDataSource.${name}`);
  };

  let connectionForm;
  switch(props.value.data.connectionType) {
    case CONNECTION_TYPE_CONNECTION_STRING.name: 
      connectionForm = <ConnectionStringConnection 
        value={props.value.data} onChange={handleDataChange} disabletor={disabletor}/>
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <FormControl className={classes.formField}>
        <TextField
          select
          label="Тип соединения"
          required 
          value={props.value.data.connectionType}
          onChange={handleConnectionTypeChange}
          disabled={disabletor('connectionType')}
        >
          {CONNECTION_TYPES.map((connectionType) => (
            <MenuItem key={connectionType.name} value={connectionType.name}>
              {connectionType.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      
      {connectionForm}
    </React.Fragment>
  );
}