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
import SqlQueryDataSet from './SqlQueryDataSet';
import CloseDialogTitle from '../common/CloseDialogTitle';
import { useFormik } from 'formik';
import { DATASET_TYPE_SQLQUERY, DATASET_TYPES } from '../../utils/const/reportConst';

const validate = (report, preValue, values) => {
  const errors = {};

  if (report.dataSets.some(d => d !== preValue && d.name === values.name)) {
    errors.name = 'Набор данных с таким именем уже существует';
  }

  return errors;
}

export default function DataSet(props) {
  const formik = useFormik({
    initialValues: props.value,
    validate: values => validate(props.report, props.value, values),
    onSubmit: values => {
      props.onSave(values);
    },
  });

  const handleTypeChange = (e) => {
    const type = e.target.value;
    switch(type) {
      case DATASET_TYPE_SQLQUERY:
        formik.setFieldValue('data', { dataSourceName: '', query: '' });
        break;
      default:
        break;
    }
    formik.setFieldValue('type', type);
  }

  const disabletor = (name) => {
    return props.disabletor(`DataSet.${name}`);
  };

  let dataSetForm;
  switch(formik.values.type) {
    case DATASET_TYPE_SQLQUERY:
      dataSetForm = <SqlQueryDataSet report={props.report} 
        data={formik.values.data} 
        onChange={(data) => formik.setFieldValue('data', data)} name='data'
        disabletor={disabletor}/>
      break;
    default:
      break;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Набор данных</CloseDialogTitle>

      <DialogContent>
        <Grid container direction='column' spacing={1}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField value={formik.values.name} onChange={formik.handleChange} 
                required label='Наименование' name='name'
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
                {DATASET_TYPES.map((dataSetType) => (
                  <MenuItem key={dataSetType} value={dataSetType}>
                    {dataSetType}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          {dataSetForm}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant='contained' color='primary'>Сохранить</Button>
      </DialogActions>
    </form>
  );
}