import React from 'react';
import ReportExplorer from './ReportExplorer';
import Template from '../../templates/Template';
import Grid from '@material-ui/core/Grid';

export default function ClosedXmlReport(props) {
  return (
    <React.Fragment>
      <Grid item xs={3}>
        <ReportExplorer 
          report={props.value.report} 
          onChange={(report) => props.onChange({ ...props.value, report })}/>
      </Grid>

      <Grid item xs={9}>
        <Template 
          report={props.value.report} 
          template={props.value.template} 
          onChange={(template) => props.onChange({ ...props.value, template })}/>
      </Grid>
    </React.Fragment>
  );
}