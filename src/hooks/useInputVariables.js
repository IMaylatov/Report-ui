import React from 'react';
import { useFormik } from 'formik';

export default function useInputVariables(report, onSubmit, content) {
  const formik = useFormik({
    initialValues: report.variables.map(variable => {
                      if (variable.type === 'period') {
                        return { ...variable, value: { beginDate: '', endDate: '' } }
                      }
                      return { ...variable, value: '' }
                    }),
    onSubmit: onSubmit,
  });

  const inputVariableForm = 
    <form onSubmit={formik.handleSubmit}>
      {content(formik)}
    </form>;

  return inputVariableForm;
}