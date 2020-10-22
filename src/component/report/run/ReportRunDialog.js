import React from 'react';
import { Button, DialogContent, DialogActions } from '@material-ui/core';
import CloseDialogTitle from '../../common/CloseDialogTitle';
import { useInputVariables } from '../../../utils';
import ReportRunInputVariables from './ReportRunInputVariables';

export default function ReportRunDialog(props) {
  const content = (formik) =>
    <React.Fragment>
      <CloseDialogTitle onClose={props.onCancel}>Укажите параметры</CloseDialogTitle>
      
      <DialogContent>
        <ReportRunInputVariables report={props.report} formik={formik} />
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant='contained' color='primary'>Запустить</Button>
      </DialogActions>
    </React.Fragment>;
  
  const inputVariableForm = useInputVariables(props.report, props.onOk, content);

  return (
    <React.Fragment>
      {inputVariableForm}
    </React.Fragment>
  )
}