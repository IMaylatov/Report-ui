import React from 'react';
import StringInputVariable from '../input/StringInputVariable';
import DateInputVariable from '../input/DateInputVariable';
import SelectInputVariable from '../input/SelectInputVariable';
import PeriodInputVariable from '../input/PeriodInputVariable';
import { 
  VARIABLE_TYPE_STRING, 
  VARIABLE_TYPE_DATE, 
  VARIABLE_TYPE_SELECT, 
  VARIABLE_TYPE_MULTIPLE_SELECT, 
  VARIABLE_TYPE_PERIOD
} from '../../../utils/const/reportConst';

export default function InputVariable(props) {
  let variableForm;
  switch(props.variable.type) {
    case VARIABLE_TYPE_STRING.name:
      variableForm = <StringInputVariable {...props}/>
      break;
    case VARIABLE_TYPE_DATE.name:
      variableForm = <DateInputVariable {...props}/>
      break;
    case VARIABLE_TYPE_SELECT.name:
      variableForm = <SelectInputVariable {...props}/>
      break;
    case VARIABLE_TYPE_MULTIPLE_SELECT.name:
      variableForm = <SelectInputVariable multiple {...props}/>
      break;
    case VARIABLE_TYPE_PERIOD.name:
      variableForm = <PeriodInputVariable {...props}/>
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