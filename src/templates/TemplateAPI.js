export const getReportTemplates = (reportId) => {
  return fetch(`/api/reports/${reportId}/templates`)
    .then(res => res.json());
}
export const addReportTemplate = (reportId, template) => {
  const formData = new FormData();
  formData.append('template', template);
  
  return fetch(`/api/reports/${reportId}/templates`, {
    method: 'POST',
    body: formData
  });
}

export const updateReportTemplate = (reportId, templateid, template) => {
  const formData = new FormData();
  formData.append('template', template);
  
  return fetch(`/api/reports/${reportId}/templates/${templateid}`, {
    method: 'PUT',
    body: formData
  });
}

export const deleteReportTemplate = (reportId, templateid) => {
  return fetch(`/api/reports/${reportId}/templates/${templateid}`, {
    method: 'DELETE'
  });
}

export const getReportTemplateDataById = (reportId, templateId) => {
  return fetch(`/api/reports/${reportId}/templates/${templateId}/data`);
}