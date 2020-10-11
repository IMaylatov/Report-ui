import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import SqlDataSource from './SqlDataSource';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';
import { addDataSource, updateDataSource } from '../DataSourceAPI';
import { useHistory } from "react-router-dom";
import { DATASOURCE_TYPE_MSSQL, DATASOURCE_TYPE_POSTGRESQL } from '../../constants';

export default function DataSource(props) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: props.value,
    onSubmit: values => {
      let dataSourceOperation = values.id === 0
        ? addDataSource(values)
        : updateDataSource(values.id, values);
      dataSourceOperation.then(dataSource => {
        history.goBack();
      });
    },
  });

  let dataSourceForm;
  switch(formik.values.type) {
    case DATASOURCE_TYPE_MSSQL:
    case DATASOURCE_TYPE_POSTGRESQL:      
      dataSourceForm = <SqlDataSource value={formik.values} onChange={formik.setValues}/>
      break;
    default:
      break;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography>Источник данных {formik.values.type}</Typography>
      <FormControl fullWidth>
        <TextField value={formik.values.name} onChange={formik.handleChange}
          required name='name' label='Наименование'
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}/>
      </FormControl>

      {dataSourceForm}
  
      <Button type="submit" color='primary'>OK</Button> 
    </form>
  );
}