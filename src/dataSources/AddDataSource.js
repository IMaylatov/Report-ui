import React from 'react';
import DataSource from './DataSource';

export default function AddDataSource(props) {
  const dataSource = {
    id: 0,
    name: '',
    type: '',
    data: {}
  };

  return (
    <DataSource value={dataSource} onSave={props.onSave} onCancel={props.onCancel} disabletor={props.disabletor}/>
  );
}