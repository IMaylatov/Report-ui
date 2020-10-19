import React, { useState, useEffect } from 'react';
import ReportHeaderSearch from '../component/report/header/ReportHeaderSearch';
import ReportTable from '../component/report/ReportTable';
import { Button, Container, Grid, Box } from '@material-ui/core';
import { getReports, deleteReport } from '../service/ReportAPI';
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';

export default function Reports() {
  const [searchReportName, setSearchReportName] = useState('');
  const [reports, setReports] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    getReports(searchReportName)
      .then(res => setReports(res))
      .catch(error => {
        enqueueSnackbar(`Ошибка загрузки отчетов: ${error}`, { variant: 'error' });
      });
  }, [searchReportName, enqueueSnackbar]);

  const handleReportDelete = (report) => {
    deleteReport(report.id)
      .then(res => {
        const removeReportIndex = reports.map(x => x.id).indexOf(report.id);
        reports.splice(removeReportIndex, 1);
        setReports([...reports]);
      })
      .catch(error => {
        enqueueSnackbar(`Ошибка удаления отчета: ${error}`, { variant: 'error' });
      });
  }

  return (
    <React.Fragment>
      <ReportHeaderSearch title='Отчеты' searchText={searchReportName} onSearchTextChange={setSearchReportName}/>
          
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
    </React.Fragment>
  );
}