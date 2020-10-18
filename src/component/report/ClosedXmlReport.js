import React from 'react';
import Template from '../template/Template';

export default function ClosedXmlReport(props) {
  return (
    <React.Fragment>
      <Template 
        report={props.value.report} 
        template={props.value.template} 
        onChange={(template) => props.onChange({ ...props.value, template })}/>
    </React.Fragment>
  );
}