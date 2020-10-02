import React from 'react';
import * as constants from './constants';
import IntInputVariable from './IntInputVariable';

export default function InputVariable(props) {
  let variableForm;
  switch(props.variable.type) {
    case constants.VARIABLE_TYPE_INT:
      variableForm = <IntInputVariable variable={props.variable} onChange={props.onChange}/>
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      {variableForm}
    </React.Fragment>
  );
}