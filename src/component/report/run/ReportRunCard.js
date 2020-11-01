import React from 'react';
import { Card, CardHeader, CardActions, CardContent, Button, Box } from '@material-ui/core';
import { useInputVariables } from '../../common/hooks';
import ReportRunInputVariables from './ReportRunInputVariables';

export default function ReportRunForm(props) {
  const content = (formik) =>
    <Card>
      <CardHeader title={props.report.name} />      

      <CardContent>
        <ReportRunInputVariables report={props.report} context={props.context} formik={formik} />
      </CardContent>

      <CardActions>
        <Box width={1} display="flex" justifyContent="flex-end">
          <Button type="submit" color='primary' variant='contained'>Запустить</Button>
        </Box>
      </CardActions>
    </Card>;
  
  const handleSubmit = (variableValues) => {
    props.onSubmit({ ...props.context, variableValues})
  }

  const inputVariableForm = useInputVariables(props.report, handleSubmit, content);

  return (
    <React.Fragment>
      {inputVariableForm}
    </React.Fragment>
  )
}