import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'inline-block'
  }
}));

export default function useInputVariables(report, onSubmit, content) {
  const classes = useStyles();

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
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      {content(formik)}
    </form>;

  return inputVariableForm;
}