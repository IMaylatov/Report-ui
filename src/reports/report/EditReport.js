import React, { useState, useEffect} from 'react';
import Report from './Report';
import { getReportById } from '../ReportAPI';
import { useParams } from "react-router-dom";
import { getReportTemplates, getReportTemplateDataById } from '../../templates/TemplateAPI';

export default function EditReport() {
  const [report, setReport] = useState(null);
  const [isLoadedReport, setIsLoadedReport] = useState(false);
  const [template, setTemplate] = useState(null);
  const [isLoadedTemplate, setIsLoadedTemplate] = useState(false);
  const { reportId } = useParams();

  useEffect(() => {
    getReportById(reportId)
      .then(res => {
        setReport(res);
        setIsLoadedReport(true);
      });

    getReportTemplates(reportId)
      .then((templates) => {
        if (templates.length > 0) {
          getReportTemplateDataById(reportId, templates[0].id)
            .then(response => response.blob())
            .then((blob) => {
              setTemplate({
                id: templates[0].id,
                data: blob
              });
              setIsLoadedTemplate(true);
            });
        } else {
          setTemplate({
            id: 0,
            data: null
          });
          setIsLoadedTemplate(true);
        }
      });
  }, [reportId]);

  return (
    <React.Fragment>
      {isLoadedReport && isLoadedTemplate &&
        <Report report={report} template={template}/>
      }
    </React.Fragment>
  );
}