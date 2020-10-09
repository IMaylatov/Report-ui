import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import SqlDataSource from './SqlDataSource';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';
import * as constants from './constants';
import Grid from '@material-ui/core/Grid';
import { addDataSource, updateDataSource } from './DataSourceAPI';
import { useHistory } from "react-router-dom";

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

  const handleTypeChange = (type) => {
    switch(type) {
      case constants.DATASOURCE_TYPE_MSSQL:
      case constants.DATASOURCE_TYPE_POSTGRESQL: 
        formik.setFieldValue('data', { connectionString: '' })
        break;
      default:
        break;
    }
    formik.setFieldValue('type', type);
  }

  let dataSourceForm;
  switch(formik.values.type) {
    case constants.DATASOURCE_TYPE_MSSQL:
    case constants.DATASOURCE_TYPE_POSTGRESQL:      
      dataSourceForm = <SqlDataSource data={formik.values.data} 
        onChange={(data) => formik.setFieldValue('data', data)} name='data'/>
      break;
    default:
      break;
  }

  const selectTypeForm = 
    <React.Fragment>
      <Typography>Выберите тип источника данных</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={() => handleTypeChange(constants.DATASOURCE_TYPE_MSSQL)} 
            variant='contained' color='primary'>MsSql</Button>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => handleTypeChange(constants.DATASOURCE_TYPE_POSTGRESQL)} 
            variant='contained' color='primary'>PostgreSql</Button>
        </Grid>
      </Grid>
    </React.Fragment>;

  const editForm = 
    <React.Fragment>
      <Typography>Источник данных {formik.values.type}</Typography>
      <FormControl fullWidth>
        <TextField value={formik.values.name} onChange={formik.handleChange}
          required name='name' label='Наименование'
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}/>
      </FormControl>

      {dataSourceForm}
  
      <Button type="submit" color='primary'>OK</Button>
    </React.Fragment>;

  return (
    <form onSubmit={formik.handleSubmit}>
      {!formik.values.type ? selectTypeForm : editForm}  
    </form>
  );
}