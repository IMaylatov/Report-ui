import React from 'react';
import { Typography } from '@material-ui/core';
import ClosedXmlTemplate from './ClosedXmlTemplate';
import * as constant from '../reports/constant';

export default function Template(props) {
  const handleValueChange = (template) => {
    props.onChange(template);
  }

  let form;
  switch(props.report.type) {
    case constant.REPORT_TYPE_CLOSEDXML:
      form = <ClosedXmlTemplate report={props.report} template={props.template} onChange={handleValueChange}/>
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <Typography variant="h6">
        Шаблон
      </Typography>
      {form}
    </React.Fragment>
  )
}