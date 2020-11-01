import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getReportById, runReportById } from '../service/api/reportAPI';
import ReportRunCard from '../component/report/run/ReportRunCard';
import ReportHeader from '../component/report/header/ReportHeader';
import { Container, Box, Toolbar } from '@material-ui/core';
import download from 'downloadjs';
import { useDialog } from '../component/common/hooks';
import ReportRunProcess from '../component/report/run/ReportRunProcess';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ReportHostCard from '../component/host/InputHostCard';
import { CONNECTION_TYPE_HOST } from '../utils/const/reportConst';
import CircularProgressBackdrop from '../component/common/CircularProgressBackdrop';

export default function ReportRun(props) {
  const { reportId } = useParams();
  const stTicket = localStorage.getItem('stTicket');
  const host = stTicket ? JSON.parse(atob(stTicket)).host : null;

  const [report, setReport] = useState(null);
  const [context, setContext] = useState(host ? { host } : null);
  const history = useHistory();
  
  const [dialog, { setDialogContent, setOpenDialog }] = useDialog({maxWidthDialog: undefined});
  const [isOpenBackdrop, setIsOpenBackdrop] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getReportById(reportId)
      .then(setReport)
      .catch(error => {
        enqueueSnackbar(`Ошибка загрузки отчета: ${error}`, { variant: 'error' });
      })
      .finally(() => setIsOpenBackdrop(false));
  }, [reportId, history, enqueueSnackbar]);

  const handleSubmit = (context) => {
    setDialogContent(<ReportRunProcess />);
    setOpenDialog(true);
    runReportById(report.id, context)
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

  let isHost = report?.dataSources.filter(d => d.data.connectionType === CONNECTION_TYPE_HOST.name).length > 0;

  return (
    <React.Fragment>
      <ReportHeader title='Отчеты'/>
      <Toolbar />

      {isHost && !context?.host &&
        <Container maxWidth="sm">
          <Box m={2}>
            <ReportHostCard onOk={setContext}/>
          </Box>
        </Container>
      }

      {report && (!isHost || context?.host) &&
        <Container maxWidth="sm">
          <Box m={2}>
            <ReportRunCard report={report} context={context} onSubmit={handleSubmit}/>
          </Box>
        </Container>
      }

      {dialog}
      
      <CircularProgressBackdrop  open={isOpenBackdrop}/>
    </React.Fragment>
  );
}