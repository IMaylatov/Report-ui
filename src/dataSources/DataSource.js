import React from 'react';
import { TextField, Button } from '@material-ui/core';
import SqlDataSource from './SqlDataSource';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import CloseDialogTitle from '../common/CloseDialogTitle';
import { useFormik } from 'formik';
import * as constants from './constants';
import Grid from '@material-ui/core/Grid';

const validate = (report, preValue, values) => {
  const errors = {};

  if (report.dataSources.some(d => d !== preValue && d.name === values.name)) {
    errors.name = 'Источник данных с таким именем уже существует';
  }

  return errors;
}

export default function DataSource(props) {
  const formik = useFormik({
    initialValues: props.value,
    validate: values => validate(props.report, props.value, values),
    onSubmit: values => {
      props.onSave(values);
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
      <CloseDialogTitle onClose={props.onCancel}>Выберите тип источника данных</CloseDialogTitle>
      <DialogContent>
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
      </DialogContent>
    </React.Fragment>;

  const editForm = 
    <React.Fragment>
      <CloseDialogTitle onClose={props.onCancel}>Источник данных {formik.values.type}</CloseDialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField value={formik.values.name} onChange={formik.handleChange}
            required name='name' label='Наименование'
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}/>
        </FormControl>
        {dataSourceForm}
      </DialogContent>
      <DialogActions>
        <Button type="submit" color='primary'>OK</Button>
      </DialogActions>
    </React.Fragment>;

  return (
    <form onSubmit={formik.handleSubmit}>
      {!formik.values.type ? selectTypeForm : editForm}  
    </form>
  );
}