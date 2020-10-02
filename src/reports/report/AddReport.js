import React from 'react';
import Report from './Report';
import * as constants from '../constant';

export default function AddReport() {
  const report = {
    id: 0,
    name: 'Новый отчет',
    type: constants.REPORT_TYPE_CLOSEDXML,
    dataSources: [],
    dataSets: [],
    variables: []
  };

  const template = {
    id: 0,
    data: null
  };

  return (
    <Report report={report} template={template}/>
  );
}