import React from 'react';
import { Button } from '@material-ui/core';
import useInputVariables from '../../variable/input/useInputVariables';
import InputVariable from '../../variable/input/InputVariable';
import download from 'downloadjs';
import { runReportById } from '../ReportAPI';
import { Card, CardHeader, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDialog } from '../../common';
import ReportRunProcess from './ReportRunProcess';

const useStyles = makeStyles((theme) => ({
  variableValueField: {
    float: 'left'
  },
  acition: {
    float: 'right'
  }
}));

export default function ReportRunForm(props) {
  const classes = useStyles();
  const [dialog, { setDialogContent, setOpenDialog }] = useDialog({maxWidthDialog: undefined});

  const handleSubmit = (variables) => {
    setDialogContent(<ReportRunProcess />);
    setOpenDialog(true);
    runReportById(props.report.id, variables)
      .then(response => response.blob())
      .then((blob) => {
        setOpenDialog(false);
        download(blob, `${props.report.name}.xlsx`);
      });
  }

  const content = (formik) =>
    <Card>
      <CardHeader 
        title={'Укажите параметры'} />      

      <CardContent>
        {formik.values.map((variable, i) => {
          return (
            <div key={i}>
              <span className={classes.variableValueField}>
                <InputVariable report={props.report} 
                  variable={variable} 
                  onChange={(value) => formik.setFieldValue(`[${i}]`, value)}
                  name={`[${i}]`}/>
              </span>
            </div>
          );
        })}
      </CardContent>

      <CardActions className={classes.acition}>
        <Button type="submit" color='primary' variant='contained'>Запустить</Button>
      </CardActions>
    </Card>;
  
  const inputVariableForm = useInputVariables(props.report, handleSubmit, content);

  return (
    <React.Fragment>
      {inputVariableForm}

      {dialog}
    </React.Fragment>
  )
}