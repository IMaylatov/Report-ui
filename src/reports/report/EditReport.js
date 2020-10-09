import React, { useState, useEffect} from 'react';
import ClosedXmlReport from './ClosedXmlReport';
import MalibuReport from './MalibuReport';
import { getReportById } from '../ReportAPI';
import { useParams } from "react-router-dom";
import { getReportTemplates, getReportTemplateDataById } from '../../templates/TemplateAPI';
import * as constants from '../constant';

export default function EditReport() {
  const [report, setReport] = useState(null);
  const [isLoadedReport, setIsLoadedReport] = useState(false);
  const [template, setTemplate] = useState(null);
  const [isLoadedTemplate, setIsLoadedTemplate] = useState(false);  
  const { reportId } = useParams();

  useEffect(() => {
    getReportById(reportId)
      .then(report => {
        setReport(report);
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

  let reportForm;
  if (isLoadedReport) 
  {
    switch(report.type) {
      case constants.REPORT_TYPE_CLOSEDXML:
        reportForm = <ClosedXmlReport report={report} template={template}/>;
        break;
      case constants.REPORT_TYPE_MALIBU:
        reportForm = <MalibuReport report={report} template={template}/>;
        break;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      {isLoadedReport && isLoadedTemplate &&
        reportForm
      }
    </React.Fragment>
  );
}