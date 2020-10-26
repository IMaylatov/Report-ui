import React, { useState } from 'react';
import { 
  Typography, 
  Button,
  Grid,
  Container,
  Box,
  Toolbar
} from '@material-ui/core';
import { REPORT_TYPES, REPORT_TYPE_MALIBU } from '../utils/const/reportConst';
import Report from '../component/report/Report';
import ReportHeader from '../component/report/header/ReportHeader';

export default function AddReport() {
  const [report, setReport] = useState({
    id: 0,
    name: 'Новый отчет',
    type: '',
    dataSources: [],
    dataSets: [],
    variables: []
  })
  const template = {
    id: 0,
    data: null
  }

  const handleTypeSelect = (type) => {
    report.type = type;
    switch(type) {
      case REPORT_TYPE_MALIBU:
        report.dataSources = [
          {
            id: 0,
            name: "DataSource",
            type: "msSql",
            data: {
                connectionString: '',
                connectionType: 'connectionString'
            }
          }
        ]
        break;
      default:
        break;
    }
    setReport({...report });
  }

  return (
    <React.Fragment>
      {report.type === '' ?
        <React.Fragment>
          <ReportHeader title='Отчеты'/>
          <Toolbar />

          <Container maxWidth="lg">
            <Box m={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h2'>Выберите тип отчета</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {REPORT_TYPES.map((reportType, i) => {
                      return (
                        <Grid key={i} item xs={2}>
                          <Button onClick={() => handleTypeSelect(reportType)}
                            fullWidth variant="contained" color="primary">
                            {reportType}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </React.Fragment>
      :
        <Report value={{ report, template }}/>
      }      
    </React.Fragment>    
  );
}