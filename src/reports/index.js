import React, { useState, useEffect } from 'react';
import ReportTable from './ReportTable';
import { Button } from '@material-ui/core';
import { getReports, deleteReport } from './ReportAPI';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../common/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10
  }
}));

export default function Reports() {
  const classes = useStyles();

  const [reports, setReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    getReports()
      .then(res => {
        setReports(res);
        setIsLoaded(true);
      });
  }, []);

  const handleReportDelete = (report) => {
    deleteReport(report.id)
      .then(res => {
        const removeReportIndex = reports.map(x => x.id).indexOf(report.id);
        reports.splice(removeReportIndex, 1);
        setReports([...reports]);
      });
  }

  return (
    <React.Fragment>
      <Header />
      
      {isLoaded &&
        <Container maxWidth="lg" className={classes.root}>
          <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
              <Button component={Link} to='/reports/add' variant="contained" color='primary'>Добавить отчет</Button>
            </Grid>            
            <Grid item xs={12}>
              <ReportTable reports={reports} onDeleteReport={handleReportDelete}/>
            </Grid>
          </Grid>
        </Container> 
      }
      
    </React.Fragment>
  );
}