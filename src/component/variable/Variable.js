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
import CloseDialogTitle from '../common/CloseDialogTitle';
import { useFormik } from 'formik';
import SelectDataVariable from './SelectDataVariable';
import { VARIABLE_TYPE_SELECT, VARIABLE_TYPE_MULTIPLE_SELECT, VARIABLE_TYPES } from '../../constants';

const validate = (report, preValue, values) => {
  const errors = {};

  if (report.variables.some(d => d !== preValue && d.name === values.name)) {
    errors.name = 'Параметр с таким именем уже существует';
  }

  return errors;
}

export default function Variable(props) {
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
  let variableFormProps = {
    report: props.report,
    data: formik.values.data,
    onDataChange: (data) => formik.setFieldValue('data', data),
    disabletor
  };
  switch(formik.values.type) {
    case VARIABLE_TYPE_SELECT.name:
      variableForm = <SelectDataVariable {...variableFormProps}/>
      break;
    case VARIABLE_TYPE_MULTIPLE_SELECT.name:      
      variableForm = <SelectDataVariable multiple {...variableFormProps}/>      
      break;
    default:
      break;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Параметр</CloseDialogTitle>

      <DialogContent>
        <Grid container direction='column' spacing={1}>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <TextField value={formik.values.name} onChange={formik.handleChange} 
                required label='Наименование' name='name'
                error={Boolean(formik.errors.name)}
                helperText={formik.errors.name}
                disabled={disabletor('name')}/>
            </FormControl>
          </Grid>
          
          <Grid item xs={7}>
            <FormControl fullWidth>
              <TextField value={formik.values.label} onChange={formik.handleChange} 
                required label='Заголовок' name='label'
                disabled={disabletor('label')}/>
            </FormControl>
          </Grid>

          <Grid item xs={7}>
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
                {VARIABLE_TYPES.map((type) => (
                  <MenuItem key={type.name} value={type.name}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          {variableForm}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant='contained' color='primary'>Сохранить</Button>
      </DialogActions>
    </form>
  );
}