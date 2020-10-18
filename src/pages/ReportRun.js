import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getReportById, runReportById } from '../service/ReportAPI';
import ReportRunCard from '../component/report/run/ReportRunCard';
import Header from '../component/common/Header';
import { Container, Box } from '@material-ui/core';
import download from 'downloadjs';
import { useDialog } from '../hooks';
import ReportRunProcess from '../component/report/run/ReportRunProcess';

export default function ReportRun(props) {
  const { reportId } = useParams();

  const [report, setReport] = useState(null); 
  
  const [dialog, { setDialogContent, setOpenDialog }] = useDialog({maxWidthDialog: undefined});

  useEffect(() => {
    getReportById(reportId)
      .then(report => setReport(report));
  }, [reportId]);

  const handleSubmit = (variables) => {
    setDialogContent(<ReportRunProcess />);
    setOpenDialog(true);
    runReportById(report.id, variables)
      .then(response => response.blob())
      .then((blob) => {
        setOpenDialog(false);
        download(blob, `${report.name}.xlsx`);
      });
  }

  return (
    <React.Fragment>
      <Header />

      {report && 
        <Container maxWidth="lg">
          <Box m={2} display="flex" justifyContent="center">
            <ReportRunCard report={report} onSubmit={handleSubmit}/>
          </Box>
        </Container>
      }

      {dialog}
    </React.Fragment>
  );
}