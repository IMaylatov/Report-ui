import React from 'react';
import InputVariable from '../../variable/input/InputVariable';

export default function ReportRunInputVariables(props) {
  return (
    <React.Fragment>
      {props.formik.values.map((variable, i) => {
        return (
          <InputVariable key={i} report={props.report} 
            variable={variable} 
            onChange={(value) => props.formik.setFieldValue(`[${i}]`, value)}
            name={`[${i}]`}/>
        );
      })}
    </React.Fragment>
  );
}