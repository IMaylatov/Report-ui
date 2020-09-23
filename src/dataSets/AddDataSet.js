import React  from 'react';
import DataSet from './DataSet';

export default function AddDataSet(props) {
  const value = {
    id: 0,
    name: '',
    type: '',
    data: null
  };

  return (
    <DataSet report={props.report} value={value} onSave={props.onSave} onCancel={props.onCancel} />
  );
}