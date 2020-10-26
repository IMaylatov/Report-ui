import React from 'react';
import { Typography } from '@material-ui/core';
import XlsxFileTemplate from './XlsxFileTemplate';
import { REPORT_TYPE_CLOSEDXML, REPORT_TYPE_MALIBU } from '../../utils/const/reportConst';

export default function Template(props) {
  const handleValueChange = (template) => {
    props.onChange(template);
  }

  let form;
  switch(props.report.type) {
    case REPORT_TYPE_CLOSEDXML:
    case REPORT_TYPE_MALIBU:
      form = <XlsxFileTemplate report={props.report} template={props.template} onChange={handleValueChange}/>
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <Typography variant="h3">
        Шаблон
      </Typography>
      {form}
    </React.Fragment>
  )
}