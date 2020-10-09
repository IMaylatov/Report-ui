import React, { useState } from 'react';
import ClosedXmlReport from './ClosedXmlReport';
import MalibuReport from './MalibuReport';
import * as constants from '../constant';
import { Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default function AddReport() {
  const [report, setReport] = useState({
    id: 0,
    name: 'Новый отчет',
    type: null,
    dataSources: [],
    dataSets: [],
    variables: []
  });
  const [reportForm, setReportForm] = useState(null);

  const template = {
    id: 0,
    data: null
  };

  const handleTypeChange = (type) => {
    report.type = type;
    switch(type) {
      case constants.REPORT_TYPE_CLOSEDXML:
        setReport({...report});
        setReportForm(<ClosedXmlReport report={report} template={template}/>);
        break;
      case constants.REPORT_TYPE_MALIBU:
        setReport({...report});
        setReportForm(<MalibuReport report={report} template={template}/>);
        break;
      default:
        break;
    }
  };

  const selectTypeForm =
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Выберите тип отчета</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => handleTypeChange(constants.REPORT_TYPE_CLOSEDXML)} 
          variant='contained' color='primary'>ClosedXml</Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => handleTypeChange(constants.REPORT_TYPE_MALIBU)} 
          variant='contained' color='primary'>Malibu</Button>
      </Grid>
    </Grid>;

  return (
    <React.Fragment>
      {!report.type &&
        selectTypeForm
      }
      {reportForm}
    </React.Fragment>    
  );
}