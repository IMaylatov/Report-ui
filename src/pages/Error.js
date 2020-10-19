import React from 'react';
import ReportHeader from '../component/report/header/ReportHeader';

export default function Error() {
  return (
    <React.Fragment>
      <ReportHeader title='Отчеты'/>
      <h1>Что-то пошло не так.</h1>
    </React.Fragment>
  );
}