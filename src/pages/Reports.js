import React, { useState } from 'react';
import ReportHeaderSearch from '../component/report/header/ReportHeaderSearch';
import ReportTable from '../component/report/ReportTable';
import { Button, Container, Grid, Box, CircularProgress, Toolbar } from '@material-ui/core';
import { getReports, deleteReport } from '../service/ReportAPI';
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import CircularProgressBackdrop from '../component/common/CircularProgressBackdrop';
import { useDebouncedSearch } from '../hooks';

const useSearchReports = (enqueueSnackbar) => 
  useDebouncedSearch(text => getReports(text)
    .catch(error => enqueueSnackbar(`Ошибка загрузки отчетов: ${error}`, { variant: 'error' })))

export default function Reports() {
  const [isDeletingReport, setIsDeletingReport] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { inputText, setInputText, searchResults } = useSearchReports(enqueueSnackbar);

  const handleReportDelete = (report) => {
    setIsDeletingReport(true);
    deleteReport(report.id)
      .then(res => {
        const removeReportIndex = searchResults.result.map(x => x.id).indexOf(report.id);
        searchResults.result.splice(removeReportIndex, 1);
        searchResults.set({...searchResults, results: [...searchResults.result]});
        enqueueSnackbar(`Отчет успешно удален`, { variant: 'success' });
      })
      .catch(error => {
        enqueueSnackbar(`Ошибка удаления отчета: ${error}`, { variant: 'error' });
      })
      .finally(onfinally => setIsDeletingReport(false));
  }

  return (
    <React.Fragment>
      <ReportHeaderSearch title='Отчеты' searchText={inputText} onSearchTextChange={setInputText}/>
      <Toolbar />
          
      <Container maxWidth="lg">
        <Box m={2}>
          <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
              <Button component={Link} to='/reports/add' variant="contained" color='primary'>Добавить отчет</Button>
            </Grid>            
            <Grid item xs={12}>
              <ReportTable reports={searchResults.result ? searchResults.result : []} onDeleteReport={handleReportDelete}/>
              {searchResults.loading &&
                <Box display='flex' justifyContent='center'>
                  <CircularProgress />
                </Box>
              }
            </Grid>
          </Grid>
        </Box>
      </Container>

      <CircularProgressBackdrop  open={isDeletingReport}/>
    </React.Fragment>
  );
}