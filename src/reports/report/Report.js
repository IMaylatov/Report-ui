import React from 'react';
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
import InputParameters from '../../parameters/InputParameters';
import download from 'downloadjs';

export default function Report(props) {  
  const formik = useFormik({
    initialValues: props.value,
    onSubmit: values => {
      if (values.id === 0) {
        addReport(values);
      } else {
        updateReport(values.id, values);
      }
    },
  });

  const [dialog, { setDialogContent, setOpenDialog }] = useDialog();

  const handleValueChange = (value) => {
    formik.setValues(value);
  }

  const sendRunReport = (parameters) => {
    const report = {
      ...formik.values,
      parameters
    };
    runReport(report)
      .then(response => response.blob())
      .then((blob) => download(blob, `${report.name}.xlsx`));
  } 

  const handleInputParameters = (parameters) => {
    setOpenDialog(false);
    sendRunReport(parameters);
  }

  const handleRunClick = (e) => {
    if (formik.values.parameters.length > 0) {
      setDialogContent(<InputParameters 
          parameters={formik.values.parameters}
          onOk={handleInputParameters}
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
          <Template report={formik.values} value={formik.values.template} 
            onChange={(template) => formik.setFieldValue('template', template)}
            name='template'/>
        </Grid>
      </Grid>

      {dialog}
    </form>
  );
}