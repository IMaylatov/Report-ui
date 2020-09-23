import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import ClosedXmlTemplate from './ClosedXmlTemplate';
import * as constant from './constant';

export default function Template(props) {
  const handleNameChange = (e) => {
    props.onChange({ ...props.value, name: e.target.value });
  }

  const handleDataChange = (data) => {
    props.onChange({ ...props.value, data });
  }

  let form;
  switch(props.value.type) {
    case constant.TEMPLATE_TYPE_CLOSEDXML:
      form = <ClosedXmlTemplate value={props.value.data} onChange={handleDataChange}/>
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <Typography variant="h6">
        Шаблон
      </Typography>
      <TextField value={props.value.name} onChange={handleNameChange} 
                    required label='Наименование'/>
      {form}
    </React.Fragment>
  )
}