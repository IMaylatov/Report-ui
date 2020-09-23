import React from 'react';
import * as constants from './constants';
import IntInputParameter from './IntInputParameter';

export default function InputParameter(props) {
  let parameterForm;
  switch(props.parameter.type) {
    case constants.PARAMTER_TYPE_INT:
      parameterForm = <IntInputParameter parameter={props.parameter} onChange={props.onChange}/>
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      {parameterForm}
    </React.Fragment>
  );
}