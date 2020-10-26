import React, { useState } from 'react';
import ReportHeader from '../component/report/header/ReportHeader';
import ReportTable from '../component/report/ReportTable';
import { Button, Container, Grid, Box, CircularProgress, Toolbar, TextField, InputAdornment } from '@material-ui/core';
import { getReports, deleteReport } from '../service/api/reportAPI';
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import CircularProgressBackdrop from '../component/common/CircularProgressBackdrop';
import useDebouncedSearch from '../component/common/hooks/useDebouncedSearch';
import SearchIcon from '../component/common/icons/SearchIcon';

const useSearchReports = (enqueueSnackbar) => 
  useDebouncedSearch(text => getReports(text)
    .catch(error => { 
      enqueueSnackbar(`Ошибка загрузки отчетов: ${error}`, { variant: 'error' });
      throw error;
    }))

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
      <ReportHeader title='Отчеты' />
      <Toolbar />
          
      <Container maxWidth="lg">
        <Box m={2}>
          <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
              <TextField
                value={inputText} onChange={(e) => setInputText(e.target.value)}
                fullWidth placeholder="Поиск" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}/>
            </Grid>
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