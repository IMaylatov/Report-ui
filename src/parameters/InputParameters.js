import React from 'react';
import { Button } from '@material-ui/core';
import CloseDialogTitle from '../common/CloseDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputParameter from './InputParameter';
import { useFormik } from 'formik';

export default function InputParameters(props) {
  const formik = useFormik({
    initialValues: props.parameters.map(parameter => {
                      return { ...parameter, value: '' }
                    }),
    onSubmit: values => {
      props.onOk(values.map(parameter => {
        return { name: parameter.name, value: parameter.value };
      }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Укажите параметры</CloseDialogTitle>
      <DialogContent>
        {formik.values.map((parameter, i) => {
          return (
            <div key={i}>
              <InputParameter parameter={parameter} onChange={(param) => formik.setFieldValue(`[${i}]`, param)}
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