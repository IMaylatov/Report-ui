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
import * as constants from './constants';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1)
  },
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Параметр</CloseDialogTitle>

      <DialogContent>
        <div>
          <FormControl>
            <TextField value={formik.values.name} onChange={formik.handleChange} 
              required label='Наименование' name='name'
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              className={classes.textField}/>
          </FormControl>
        </div>
        
        <div>
          <FormControl>
            <TextField value={formik.values.label} onChange={formik.handleChange} 
              required label='Псевдоним' name='label'
              className={classes.textField}/>
          </FormControl>
        </div>

        <div>
          <FormControl >
            <TextField
              select
              label="Тип"
              required 
              value={formik.values.type}
              onChange={formik.handleChange}
              name='type'
              className={classes.textField}
            >
              {constants.VARIABLE_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl>
            <TextField
              select
              label="Вид"
              required 
              value={formik.values.kind}
              onChange={formik.handleChange}
              name='kind'
              className={classes.textField}
            >
              {constants.VARIABLE_KINDS.map((kind) => (
                <MenuItem key={kind.name} value={kind.name}>
                  {kind.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>
      </DialogContent>

      <DialogActions>
        <Button type="submit" color='primary'>OK</Button>
      </DialogActions>
    </form>
  );
}