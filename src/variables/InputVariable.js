import React from 'react';
import * as constants from './constants';
import StringInputVariable from './StringInputVariable';
import DateInputVariable from './DateInputVariable';
import SelectInputVariable from './SelectInputVariable';
import MultipleSelectInputVariable from './MultipleSelectInputVariable';
import PeriodInputVariable from './PeriodInputVariable';

export default function InputVariable(props) {
  let variableForm;
  switch(props.variable.type) {
    case constants.VARIABLE_TYPE_STRING.name:
      variableForm = <StringInputVariable variable={props.variable} onChange={props.onChange}/>
      break;
    case constants.VARIABLE_TYPE_DATE.name:
      variableForm = <DateInputVariable variable={props.variable} onChange={props.onChange}/>
      break;
    case constants.VARIABLE_TYPE_SELECT.name:
      variableForm = <SelectInputVariable report={props.report} variable={props.variable} onChange={props.onChange}/>
      break;
    case constants.VARIABLE_TYPE_MULTIPLE_SELECT.name:
      variableForm = <MultipleSelectInputVariable report={props.report} variable={props.variable} onChange={props.onChange}/>
      break;
    case constants.VARIABLE_TYPE_PERIOD.name:
      variableForm = <PeriodInputVariable report={props.report} variable={props.variable} onChange={props.onChange}/>
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