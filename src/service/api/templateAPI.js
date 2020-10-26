import fetchApi from './fetchApi';

export const getReportTemplates = (reportId) => {
  return fetchApi(`/api/reports/${reportId}/templates`)
    .then(res => res.json());
}

export const addReportTemplate = (reportId, template) => {
  const formData = new FormData();
  formData.append('template', template);
  
  return fetchApi(`/api/reports/${reportId}/templates`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json());
}

export const updateReportTemplate = (reportId, templateid, template) => {
  const formData = new FormData();
  formData.append('template', template);
  
  return fetchApi(`/api/reports/${reportId}/templates/${templateid}`, {
      method: 'PUT',
      body: formData
    })
    .then(res => res.json());
}

export const deleteReportTemplate = (reportId, templateid) => {
  return fetchApi(`/api/reports/${reportId}/templates/${templateid}`, {
    method: 'DELETE'
  });
}

export const getReportTemplateDataById = (reportId, templateId) => {
  return fetchApi(`/api/reports/${reportId}/templates/${templateId}/data`);
}