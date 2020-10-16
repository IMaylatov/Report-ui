import React from 'react';
import ClosedXmlReport from './ClosedXmlReport';
import MalibuReport from './MalibuReport';
import { REPORT_TYPE_CLOSEDXML, REPORT_TYPE_MALIBU } from '../../constants';
import { addReport, updateReport } from '../ReportAPI';
import { addReportTemplate, updateReportTemplate, deleteReportTemplate } from '../../templates/TemplateAPI';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { useDialog } from '../../common';
import InputVariables from '../../variable/input/InputVariables';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { runReport } from '../ReportAPI';
import download from 'downloadjs';
import { makeStyles } from '@material-ui/core/styles';
import ReportRunProcess from '../run/ReportRunProcess';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    paddingTop: 3.5
  },
  logoButton: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  logoIcon: {
    fontSize: 40
  },
  reportNameTextField: {
    width: 400,
    paddingBottom: 1.5,
    '& .MuiOutlinedInput-root': {
      '& input': {
        paddingTop: 3.5,
        paddingBottom: 3.5,
        paddingLeft: 5
      },
      '&:not(hover) fieldset': {
        borderColor: 'transparent',
      },
    }
  },
  menuButton: {
    textTransform: 'none',
    fontSize: 14,
    padding: '2px  5px'
  }
}));

export default function Report(props) {
  const classes = useStyles();

  const history = useHistory();
  const [dialog, { setDialogContent, setOpenDialog }] = useDialog({maxWidthDialog: undefined});
  
  const formik = useFormik({
    initialValues: props.value,
    onSubmit: values => {
      const { report, template } = values;
      let reportOperation = report.id === 0
        ? addReport(report)
        : updateReport(report.id, report);
      reportOperation.then(report => {
        if (template.id === 0) {
          if (template.data !== null) {
            addReportTemplate(report.id, template.data)
              .then(res => history.push(`${report.id}`));
          }          
        } else {          
          if (template.data !== null) {
            updateReportTemplate(report.id, template.id, template.data);
          } else {
            deleteReportTemplate(report.id, template.id);
          }
        }
      })
    }
  });

  const handleNameChange = (e) => {
    formik.setValues('name', e.target.value);
  }

  let reportForm;
  switch(formik.values.report.type) {
    case REPORT_TYPE_CLOSEDXML:
      reportForm = <ClosedXmlReport value={formik.values} onChange={formik.setValues}/>;
      break;
    case REPORT_TYPE_MALIBU:
      {
        reportForm = <MalibuReport value={formik.values} onChange={formik.setValues}/>;
        break;
      }
    default:
      break;
  }
      
  const sendRunReport = (variables) => {
    runReport(formik.values.report, formik.values.template, variables)
      .then(response => response.blob())
      .then((blob) => {
        setOpenDialog(false);
        download(blob, `${formik.values.report.name}.xlsx`);
      });
  } 

  const handleInputVariables = (variables) => {
    setDialogContent(
      <ReportRunProcess />
    );
    sendRunReport(variables);
  }

  const handleRunClick = (e) => {
    if (formik.values.report.variables.length > 0) {
      setDialogContent(<InputVariables 
        report={formik.values.report}
        onOk={handleInputVariables}
        onCancel={(e) => setOpenDialog(false)}/>);
      setOpenDialog(true);
    } else {      
      sendRunReport([]);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar position="fixed" color='inherit' className={classes.appBar}>
            <Toolbar>
              <IconButton component={Link} to='/reports' edge="start" color="inherit" className={classes.logoButton}>
                <HomeIcon className={classes.logoIcon}/>
              </IconButton>

              <Grid container direction="column">
                <Grid item>
                  <TextField value={formik.values.report.name} onChange={handleNameChange} 
                    name='report.name' required
                    variant="outlined" size='small'
                    className={classes.reportNameTextField}/>
                </Grid>

                <Grid item>
                  <Button type="submit" size='small' className={classes.menuButton}>Сохранить</Button>
                  <Button size='small' onClick={handleRunClick} className={classes.menuButton}>Запустить</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
          
        {reportForm}

        {dialog}
      </Grid>
    </form> 
  );
}