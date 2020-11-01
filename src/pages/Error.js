import React from 'react';
import ReportHeader from '../component/report/header/ReportHeader';
import { Toolbar } from '@material-ui/core';

export default function Error() {
  return (
    <React.Fragment>
      <ReportHeader title='Отчеты'/>
      <Toolbar />
      <h1>Что-то пошло не так.</h1>
    </React.Fragment>
  );
}