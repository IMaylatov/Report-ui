import React  from 'react';
import DataSet from './DataSet';

export default function AddDataSet(props) {
  const dataSet = {
    id: 0,
    name: '',
    type: '',
    data: null
  };

  return (
    <DataSet report={props.report} value={dataSet} onSave={props.onSave} onCancel={props.onCancel} disabletor={props.disabletor}/>
  );
}