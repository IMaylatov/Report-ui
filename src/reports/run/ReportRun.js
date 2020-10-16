import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { getReportById } from '../ReportAPI';
import ReportRunForm from './ReportRunForm';
import Header from '../../common/Header';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10
  }
}));

export default function ReportRun(props) {
  const classes = useStyles();

  const { reportId } = useParams();

  const [report, setReport] = useState(null); 

  useEffect(() => {
    getReportById(reportId)
      .then(report => setReport(report));
  }, [reportId]);

  return (
    <React.Fragment>
      <Header />

      {report && 
        <Container maxWidth="lg" className={classes.root}>
          <div align='center'>
            <ReportRunForm report={report} />
          </div>
        </Container>
      }
    </React.Fragment>
  );
}