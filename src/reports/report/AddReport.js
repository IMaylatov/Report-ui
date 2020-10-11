import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { REPORT_TYPE_CLOSEDXML, REPORT_TYPE_MALIBU } from '../../constants';
import Report from './Report';

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
    setReport({...report });
  }

  return (
    <React.Fragment>
      {report.type === '' &&
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Выберите тип отчета</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => handleTypeSelect(REPORT_TYPE_CLOSEDXML)} 
              variant='contained' color='primary'>ClosedXml</Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => handleTypeSelect(REPORT_TYPE_MALIBU)} 
              variant='contained' color='primary'>Malibu</Button>
          </Grid>
        </Grid>
      }
      {report.type !== '' &&
        <Report value={{ report, template }}/>
      }      
    </React.Fragment>    
  );
}