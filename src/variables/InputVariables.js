import React from 'react';
import { Button } from '@material-ui/core';
import CloseDialogTitle from '../common/CloseDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputVariable from './InputVariable';
import { useFormik } from 'formik';

export default function InputVariables(props) {
  const formik = useFormik({
    initialValues: props.variables.map(variable => {
                      return { ...variable, value: '' }
                    }),
    onSubmit: values => {
      props.onOk(values.map(variable => {
        return { name: variable.name, value: variable.value };
      }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Укажите параметры</CloseDialogTitle>
      <DialogContent>
        {formik.values.map((variable, i) => {
          return (
            <div key={i}>
              <InputVariable variable={variable} onChange={(param) => formik.setFieldValue(`[${i}]`, param)}
                name={`[${i}]`}/>
            </div>
          );
        })}
      </DialogContent>

      <DialogActions>
        <Button type="submit" color='primary'>OK</Button>
      </DialogActions>
    </form>
  )
}