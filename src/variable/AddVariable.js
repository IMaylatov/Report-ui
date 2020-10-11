import React  from 'react';
import Variable from './Variable';

export default function AddVariable(props) {
  const variable = {
    id: 0,
    name: '',
    label: '',
    type: '',
    kind: ''
  };

  return (
    <Variable report={props.report} value={variable} onSave={props.onSave} onCancel={props.onCancel}/>
  );
}