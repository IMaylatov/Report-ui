import React from 'react';
import { 
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CloseDialogTitle from '../common/CloseDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';
import SelectDataVariable from './SelectDataVariable';
import { VARIABLE_TYPE_SELECT, VARIABLE_TYPE_MULTIPLE_SELECT, VARIABLE_TYPES } from '../constants';

const useStyles = makeStyles((theme) => ({
  formField: {
    width: 300
  }
}));

const validate = (report, preValue, values) => {
  const errors = {};

  if (report.variables.some(d => d !== preValue && d.name === values.name)) {
    errors.name = 'Параметр с таким именем уже существует';
  }

  return errors;
}

export default function Variable(props) {
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
    formik.setFieldValue('type', type);
    if (type === VARIABLE_TYPE_SELECT.name || type === VARIABLE_TYPE_MULTIPLE_SELECT.name) {
      formik.setFieldValue('data', {
        captionField: '',
        keyField: '',
        dataSet: {
          type: 'SqlQuery',
          data: {
            dataSourceName: '',
            query: ''
          }
        }
      });
    } else {
      formik.setFieldValue('data', '');
    }
  }

  const disabletor = (name) => {
    return props.disabletor(`Variable.${name}`);
  };

  let variableForm;
  switch(formik.values.type) {
    case VARIABLE_TYPE_SELECT.name:
      variableForm = <SelectDataVariable report={props.report}
        data={formik.values.data} 
        onDataChange={(data) => formik.setFieldValue('data', data)} 
        disabletor={disabletor}/>
      break;
    case VARIABLE_TYPE_MULTIPLE_SELECT.name:      
      variableForm = <SelectDataVariable multiple report={props.report} 
        data={formik.values.data} 
        onDataChange={(data) => formik.setFieldValue('data', data)} 
        disabletor={disabletor}/>      
      break;
    default:
      break;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Параметр</CloseDialogTitle>

      <DialogContent>
        <div>
          <FormControl className={classes.formField}>
            <TextField value={formik.values.name} onChange={formik.handleChange} 
              required label='Наименование' name='name'
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              disabled={disabletor('name')}/>
          </FormControl>
        </div>
        
        <div>
          <FormControl className={classes.formField}>
            <TextField value={formik.values.label} onChange={formik.handleChange} 
              required label='Заголовок' name='label'
              disabled={disabletor('label')}/>
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
              {VARIABLE_TYPES.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>

        <div>
          {variableForm}
        </div>
      </DialogContent>

      <DialogActions>
        <Button type="submit" color='primary'>OK</Button>
      </DialogActions>
    </form>
  );
}