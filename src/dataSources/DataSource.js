import React from 'react';
import { TextField, Button } from '@material-ui/core';
import SqlDataSource from './SqlDataSource';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';
import { DATASOURCE_TYPES, DATASOURCE_TYPE_MSSQL, DATASOURCE_TYPE_POSTGRESQL } from '../constants';
import CloseDialogTitle from '../common/CloseDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formField: {
    width: 200
  }
}));

export default function DataSource(props) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: props.value,
    onSubmit: values => {
      props.onSave(values);
    },
  });

  const disabletor = (name) => {
    return props.disabletor(`DataSource.${name}`);
  };
  
  const handleTypeChange = (e) => {
    const type = e.target.value;
    switch(type) {
      case DATASOURCE_TYPE_MSSQL:
      case DATASOURCE_TYPE_POSTGRESQL:    
        formik.setFieldValue('data', { connectionType: '' });
        break;
      default:
        break;
    }
    formik.setFieldValue('type', type);
  }

  let dataSourceForm;
  switch(formik.values.type) {
    case DATASOURCE_TYPE_MSSQL:
    case DATASOURCE_TYPE_POSTGRESQL:      
      dataSourceForm = <SqlDataSource value={formik.values} onChange={formik.setValues} disabletor={disabletor}/>
      break;
    default:
      break;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Источник данных</CloseDialogTitle>

      <DialogContent>
        <div>
          <FormControl className={classes.formField}>
            <TextField value={formik.values.name} onChange={formik.handleChange}
              required name='name' label='Наименование'
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              disabled={disabletor('name')}/>
          </FormControl>
        </div>
        
        <div>
          <FormControl className={classes.formField}>
            <TextField
              select
              label="Тип"
              required 
              value={formik.values.type}
              onChange={handleTypeChange}
              name='type'
              disabled={disabletor('type')}
            >
              {DATASOURCE_TYPES.map((dataSource) => (
                <MenuItem key={dataSource} value={dataSource}>
                  {dataSource}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>

        <div>
          {dataSourceForm}
        </div>
      </DialogContent>

      <DialogActions>
        <Button type="submit" color='primary'>OK</Button>
      </DialogActions>
    </form>
  );
}