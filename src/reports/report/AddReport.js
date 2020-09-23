import React from 'react';
import Report from './Report';
import * as constants from '../../templates/constant';

export default function AddReport() {
  const value = {
    id: 0,
    name: 'Новый отчет',
    dataSources: [],
    dataSets: [],
    parameters: [],
    template: {
      name: '',
      type: constants.TEMPLATE_TYPE_CLOSEDXML,
      data: {
        file: ''
      }
    }
  };

  return (
    <Report value={value}/>
  );
}