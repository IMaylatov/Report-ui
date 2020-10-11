import React from 'react';
import { 
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SqlQueryDataSet from './SqlQueryDataSet';
import MenuItem from '@material-ui/core/MenuItem';
import CloseDialogTitle from '../common/CloseDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';
import { DATASET_TYPE_SQLQUERY, DATASET_TYPES } from '../constants';

const useStyles = makeStyles({
  textField: {
    'width': '200px'
  }
});

const validate = (report, preValue, values) => {
  const errors = {};

  if (report.dataSets.some(d => d !== preValue && d.name === values.name)) {
    errors.name = 'Набор данных с таким именем уже существует';
  }

  return errors;
}

export default function DataSet(props) {
  const classes = useStyles();

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
        <div>
          <FormControl fullWidth className={classes.textField}>
            <TextField value={formik.values.name} onChange={formik.handleChange} 
              required label='Наименование' name='name'
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              disabled={disabletor('name')}/>
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth className={classes.textField}>
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
        </div>

        {dataSetForm}
      </DialogContent>

      <DialogActions>
        <Button type="submit" color='primary'>OK</Button>
      </DialogActions>
    </form>
  );
}