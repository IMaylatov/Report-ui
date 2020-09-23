import React  from 'react';
import Parameter from './Parameter';

export default function AddParameter(props) {
  const value = {
    id: 0,
    name: '',
    label: '',
    type: '',
    kind: ''
  };

  return (
    <Parameter report={props.report} value={value} onSave={props.onSave} onCancel={props.onCancel}/>
  );
}