import React  from 'react';
import DataSource from './DataSource';

export default function AddDataSource(props) {
  const value = {
    id: 0,
    name: '',
    type: '',
    data: {}
  };

  return (
    <React.Fragment>
      <DataSource report={props.report} value={value} onSave={props.onSave} onCancel={props.onCancel}/>
    </React.Fragment>
  );
}