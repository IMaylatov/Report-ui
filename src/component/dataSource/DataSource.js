import React from 'react';
import { 
  TextField, 
  Button, 
  MenuItem,
  DialogContent,
  DialogActions,
  FormControl,
  Grid
} from '@material-ui/core';
import SqlDataSource from './SqlDataSource';
import { useFormik } from 'formik';
import { DATASOURCE_TYPES, DATASOURCE_TYPE_MSSQL, DATASOURCE_TYPE_POSTGRESQL } from '../../constants';
import CloseDialogTitle from '../common/CloseDialogTitle';

export default function DataSource(props) {
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
        <Grid container direction='column' spacing={1}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField value={formik.values.name} onChange={formik.handleChange}
                required name='name' label='Наименование'
                error={Boolean(formik.errors.name)}
                helperText={formik.errors.name}
                disabled={disabletor('name')}/>
            </FormControl>
          </Grid>
          
          <Grid item xs={4}>
            <FormControl fullWidth>
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
          </Grid>

          {dataSourceForm}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant='contained' color='primary'>Сохранить</Button>
      </DialogActions>
    </form>
  );
}