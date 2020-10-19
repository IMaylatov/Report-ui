import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClosedXmlReport from './ClosedXmlReport';
import MalibuReport from './MalibuReport';
import { REPORT_TYPE_CLOSEDXML, REPORT_TYPE_MALIBU } from '../../constants';
import { addReport, updateReport, runReport } from '../../service/ReportAPI';
import { addReportTemplate, updateReportTemplate, deleteReportTemplate } from '../../service/TemplateAPI';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { useDialog } from '../../hooks';
import ReportRunDialog from './run/ReportRunDialog';
import download from 'downloadjs';
import ReportRunProcess from './run/ReportRunProcess';
import ReportHeaderOperation from './header/ReportHeaderOperation';
import { Drawer, Toolbar } from '@material-ui/core';
import ReportExplorer from './ReportExplorer';
import { useSnackbar } from 'notistack';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const malibuDisabledFields = [
  'ReportExplorer.DataSource.name',
  'ReportExplorer.DataSource.type',

  'ReportExplorer.DataSet.name',
  'ReportExplorer.DataSet.type',
  'ReportExplorer.DataSet.SqlQueryDataSet.dataSourceName',
  'ReportExplorer.DataSet.SqlQueryDataSet.query',

  'ReportExplorer.Variable.name',  
  'ReportExplorer.Variable.label',
  'ReportExplorer.Variable.type',
  'ReportExplorer.Variable.SelectDataVariable.dataSourceName'
];

export default function Report(props) {
  const classes = useStyles();

  const history = useHistory();
  const [dialog, { setDialogContent, setOpenDialog }] = useDialog({maxWidthDialog: undefined});
  const { enqueueSnackbar } = useSnackbar();
  
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
              .then(res => history.replace(`${report.id}`))
              .catch(error => {
                enqueueSnackbar(`Ошибка сохранения шаблона: ${error}`, { variant: 'error' });
              });
          } else {
            history.replace(`${report.id}`);
          }
        } else {          
          if (template.data !== null) {
            updateReportTemplate(report.id, template.id, template.data)
              .catch(error => {
                enqueueSnackbar(`Ошибка сохранения шаблона: ${error}`, { variant: 'error' });
              });
          } else {
            deleteReportTemplate(report.id, template.id)
              .catch(error => {
                enqueueSnackbar(`Ошибка удаления шаблона: ${error}`, { variant: 'error' });
              });
          }
        }
      })
      .catch(error => {
        enqueueSnackbar(`Ошибка сохранения отчета: ${error}`, { variant: 'error' });
      });
    }
  });

  let reportForm;
  let explorerProps;
  let reportFormProps = { value: formik.values, onChange: formik.setValues };
  switch(formik.values.report.type) {
    case REPORT_TYPE_CLOSEDXML:
      reportForm = <ClosedXmlReport {...reportFormProps}/>;
      break;
    case REPORT_TYPE_MALIBU:
      reportForm = <MalibuReport {...reportFormProps}/>;
      explorerProps = { addItemHidden: true, deleteItemHidden: true, disabletor: (name) => malibuDisabledFields.includes(name) };
      break;
    default:
      break;
  }

      
  const sendRunReport = (variables) => {
    runReport(formik.values.report, formik.values.template, variables)
      .then(response => response.blob())
      .then((blob) => {
        setOpenDialog(false);
        download(blob, `${formik.values.report.name}.xlsx`);
      })
      .catch(error => {
        setOpenDialog(false);
        enqueueSnackbar(`Ошибка формирования отчета: ${error}`, { variant: 'error' });
      });
  } 

  const handleInputVariables = (variables) => {
    setDialogContent(<ReportRunProcess />);
    sendRunReport(variables);
  }

  const handleRunClick = (e) => {
    if (formik.values.report.variables.length > 0) {
      setDialogContent(<ReportRunDialog 
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
      <ReportHeaderOperation report={formik.values.report} onChange={(report) => formik.setFieldValue('report', report)}
        onRunClick={handleRunClick}/>
              
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <ReportExplorer 
            report={formik.values.report} 
            onChange={(report) => formik.setFieldValue('report', report)}
            {...explorerProps}/>
        </div>
      </Drawer>

      <main className={classes.content}>  
        <Toolbar /> 
        {reportForm}
      </main>

      {dialog}
    </form> 
  );
}