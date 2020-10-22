import React from 'react';
import { Card, CardHeader, CardActions, CardContent, Button, Box } from '@material-ui/core';
import { useInputVariables } from '../../../utils';
import ReportRunInputVariables from './ReportRunInputVariables';

export default function ReportRunForm(props) {
  const content = (formik) =>
    <Card>
      <CardHeader title={'Укажите параметры'} />      

      <CardContent>
        <ReportRunInputVariables report={props.report} formik={formik} />
      </CardContent>

      <CardActions>
        <Box width={1} display="flex" justifyContent="flex-end">
          <Button type="submit" color='primary' variant='contained'>Запустить</Button>
        </Box>
      </CardActions>
    </Card>;
  
  const inputVariableForm = useInputVariables(props.report, props.onSubmit, content);

  return (
    <React.Fragment>
      {inputVariableForm}
    </React.Fragment>
  )
}