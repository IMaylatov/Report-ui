import React from 'react';
import { Button } from '@material-ui/core';
import CloseDialogTitle from '../../common/CloseDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputVariable from './InputVariable';
import useInputVariables from './useInputVariables';

export default function InputVariables(props) {
  const content = (formik) =>
    <React.Fragment>
      <CloseDialogTitle onClose={props.onCancel}>Укажите параметры</CloseDialogTitle>
      <DialogContent>
        {formik.values.map((variable, i) => {
          return (
            <div key={i}>
              <InputVariable report={props.report} 
                variable={variable} 
                onChange={(value) => formik.setFieldValue(`[${i}]`, value)}
                name={`[${i}]`}/>
            </div>
          );
        })}
      </DialogContent>

      <DialogActions>
        <Button type="submit" color='primary'>Запустить</Button>
      </DialogActions>
    </React.Fragment>;
  
  const inputVariableForm = useInputVariables(props.report, props.onOk, content);

  return (
    <React.Fragment>
      {inputVariableForm}
    </React.Fragment>
  )
}