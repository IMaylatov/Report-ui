import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getReportById, runReportById } from '../service/ReportAPI';
import ReportRunCard from '../component/report/run/ReportRunCard';
import ReportHeader from '../component/report/header/ReportHeader';
import { Container, Box, Toolbar } from '@material-ui/core';
import download from 'downloadjs';
import { useDialog } from '../utils';
import ReportRunProcess from '../component/report/run/ReportRunProcess';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ReportHostCard from '../component/report/host/ReportHostCard';

export default function ReportRun(props) {
  const { reportId } = useParams();

  const [report, setReport] = useState(null); 
  const [host, setHost] = useState(null); 
  const history = useHistory();
  
  const [dialog, { setDialogContent, setOpenDialog }] = useDialog({maxWidthDialog: undefined});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getReportById(reportId)
      .then(report => setReport(report))
      .catch(error => {
        history.push('/error');
      });
  }, [reportId, history]);

  const handleSubmit = (variables) => {
    setDialogContent(<ReportRunProcess />);
    setOpenDialog(true);
    runReportById(report.id, host, variables)
      .then(res => res.blob())
      .then((blob) => {
        setOpenDialog(false);
        download(blob, `${report.name}.xlsx`);
      })
      .catch(error => {
        setOpenDialog(false);
        enqueueSnackbar(`Ошибка формирования отчета: ${error}`, { variant: 'error' });
      });
  }

  return (
    <React.Fragment>
      <ReportHeader title='Отчеты'/>
      <Toolbar />

      {!host &&
        <Container maxWidth="sm">
          <Box m={2}>
            <ReportHostCard onOk={(host) => setHost(host)}/>
          </Box>
        </Container>
      }

      {report && host &&
        <Container maxWidth="sm">
          <Box m={2}>
            <ReportRunCard report={report} host={host} onSubmit={handleSubmit}/>
          </Box>
        </Container>
      }

      {dialog}
    </React.Fragment>
  );
}