import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import ReportExplorer from './ReportExplorer';
import Template from '../../templates/Template';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import { addReport, updateReport, runReport } from '../ReportAPI';
import { useFormik } from 'formik';
import { useDialog } from '../../common';
import InputVariables from '../../variables/InputVariables';
import download from 'downloadjs';
import { addReportTemplate, updateReportTemplate, deleteReportTemplate } from '../../templates/TemplateAPI';

export default function Report(props) {  
  const [template, setTemplate] = useState(props.template);

  const formik = useFormik({
    initialValues: props.report,
    onSubmit: values => {
      let reportOperation = values.id === 0
        ? addReport(values)
        : updateReport(values.id, values);
      reportOperation.then(report => {
        if (template.id === 0) {
          addReportTemplate(report.id, template.data);
        } else {          
          if (template.data !== null) {
            updateReportTemplate(report.id, template.id, template.data);
          } else {
            deleteReportTemplate(report.id, template.id);
          }
        }
      })
    },
  });

  const [dialog, { setDialogContent, setOpenDialog }] = useDialog();

  const handleValueChange = (value) => {
    formik.setValues(value);
  }

  const sendRunReport = (variables) => {
    const report = {
      ...formik.values,
      variables
    };
    runReport(report, template)
      .then(response => response.blob())
      .then((blob) => download(blob, `${report.name}.xlsx`));
  } 

  const handleInputVariables = (variables) => {
    setOpenDialog(false);
    sendRunReport(variables);
  }

  const handleRunClick = (e) => {
    if (formik.values.variables.length > 0) {
      setDialogContent(<InputVariables 
        variables={formik.values.variables}
          onOk={handleInputVariables}
          onCancel={(e) => setOpenDialog(false)}/>);
      setOpenDialog(true);
    } else {      
      sendRunReport([]);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar position="static" color='inherit'>
            <Toolbar>
              <IconButton component={Link} to='/reports' edge="start" color="inherit">
                <HomeIcon />
              </IconButton>

              <Grid container direction="column">
                <Grid item>
                  <TextField value={formik.values.name} onChange={formik.handleChange} 
                    name='name' required
                    variant="outlined" size='small'/>
                </Grid>

                <Grid item>
                  <Button type="submit" variant='contained' size='small'>Сохранить</Button>
                  <Button variant='contained' size='small' onClick={handleRunClick}>Запустить</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item xs={3}>
          <ReportExplorer report={formik.values} onChange={handleValueChange}/>
        </Grid>
        
        <Grid item xs={9}>
          <Template report={formik.values} template={template} 
            onChange={(template) => setTemplate(template)}/>
        </Grid>
      </Grid>

      {dialog}
    </form>
  );
}