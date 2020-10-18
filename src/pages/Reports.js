import React, { useState, useEffect } from 'react';
import Header from '../component/common/Header';
import ReportTable from '../component/report/ReportTable';
import { Button, Container, Grid, Box } from '@material-ui/core';
import { getReports, deleteReport } from '../service/ReportAPI';
import { Link } from "react-router-dom";

export default function Reports() {
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
        <Container maxWidth="lg">
          <Box m={2}>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={12}>
                <Button component={Link} to='/reports/add' variant="contained" color='primary'>Добавить отчет</Button>
              </Grid>            
              <Grid item xs={12}>
                <ReportTable reports={reports} onDeleteReport={handleReportDelete}/>
              </Grid>
            </Grid>
          </Box>
        </Container>
      }
    </React.Fragment>
  );
}