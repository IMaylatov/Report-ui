import React from 'react';
import ReportHeader from '../component/report/header/ReportHeader';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <ReportHeader title='Отчеты'/>
          <h1>Что-то пошло не так.</h1>
        </React.Fragment>
      );
    }

    return this.props.children; 
  }
}