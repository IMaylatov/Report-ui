import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getReportById } from '../ReportAPI';
import ReportRunForm from './ReportRunForm';

export default function ReportRun(props) {
  const { reportId } = useParams();

  const [report, setReport] = useState(null); 

  useEffect(() => {
    getReportById(reportId)
      .then(report => setReport(report));
  }, [reportId]);

  return (
    <React.Fragment>
      {report && 
        <ReportRunForm report={report} />
      }
    </React.Fragment>
  );
}