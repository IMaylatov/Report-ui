import React from 'react';
import { Button } from '@material-ui/core';
import useInputVariables from '../../variable/input/useInputVariables';
import InputVariable from '../../variable/input/InputVariable';
import download from 'downloadjs';
import { runReportById } from '../ReportAPI';

export default function ReportRunForm(props) {
  const handleSubmit = (variables) => {
    runReportById(props.report.id, variables)
      .then(response => response.blob())
      .then((blob) => download(blob, `${props.report.name}.xlsx`));
  }

  const content = (formik) =>
    <React.Fragment>
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

      <Button type="submit" color='primary'>OK</Button>
    </React.Fragment>;
  
  const inputVariableForm = useInputVariables(props.report, handleSubmit, content);

  return (
    <React.Fragment>
      {inputVariableForm}
    </React.Fragment>
  )
}