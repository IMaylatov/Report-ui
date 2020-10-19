import React, { useState, useEffect} from 'react';
import { getReportById } from '../service/ReportAPI';
import { useParams } from "react-router-dom";
import { getReportTemplates, getReportTemplateDataById } from '../service/TemplateAPI';
import Report from '../component/report/Report';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function EditReport() {
  const { reportId } = useParams();

  const [report, setReport] = useState(null);
  const [template, setTemplate] = useState(null);  
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getReportById(reportId)
      .then(report => setReport(report))
      .catch(error => {
        history.push('/error');
      });

    getReportTemplates(reportId)
      .then((templates) => {
        if (templates.length > 0) {
          const templateId = templates[0].id;
          getReportTemplateDataById(reportId, templateId)
            .then(response => response.blob())
            .then((blob) => setTemplate({ id: templateId, data: blob }))
            .catch(error => {
              setTemplate({ id: 0, data: null });
              enqueueSnackbar(`Ошибка загрузки шаблона: ${error}`, { variant: 'error' });
            });
        } else {
          setTemplate({ id: 0, data: null });
        }
      })
      .catch(error => {
        setTemplate({ id: 0, data: null });
        enqueueSnackbar(`Ошибка загрузки шаблона: ${error}`, { variant: 'error' });
      });
  }, [reportId, history, enqueueSnackbar]);

  return (
    <React.Fragment>
      {report && template &&
        <Report value={{ report, template }}/>
      }
    </React.Fragment>
  );
}