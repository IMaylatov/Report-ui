import React  from 'react';
import Variable from './Variable';

export default function AddVariable(props) {
  const value = {
    id: 0,
    name: '',
    label: '',
    type: '',
    kind: ''
  };

  return (
    <Variable report={props.report} value={value} onSave={props.onSave} onCancel={props.onCancel}/>
  );
}