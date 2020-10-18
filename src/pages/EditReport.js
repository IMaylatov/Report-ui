import React, { useState, useEffect} from 'react';
import { getReportById } from '../service/ReportAPI';
import { useParams } from "react-router-dom";
import { getReportTemplates, getReportTemplateDataById } from '../service/TemplateAPI';
import Report from '../component/report/Report';

export default function EditReport() {
  const { reportId } = useParams();

  const [report, setReport] = useState(null);
  const [template, setTemplate] = useState(null);  

  useEffect(() => {
    getReportById(reportId)
      .then(report => setReport(report));

    getReportTemplates(reportId)
      .then((templates) => {
        if (templates.length > 0) {
          const templateId = templates[0].id;
          getReportTemplateDataById(reportId, templateId)
            .then(response => response.blob())
            .then((blob) => setTemplate({ id: templateId, data: blob }));
        } else {
          setTemplate({ id: 0, data: null });
        }
      });
  }, [reportId]);

  return (
    <React.Fragment>
      {report && template &&
        <Report value={{ report, template }}/>
      }
    </React.Fragment>
  );
}