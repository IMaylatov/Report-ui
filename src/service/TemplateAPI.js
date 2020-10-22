import axios from 'axios'

export const getReportTemplates = (reportId) => {
  return axios.get(`/api/reports/${reportId}/templates`)
    .then(res => res.data);
}

export const addReportTemplate = (reportId, template) => {
  const formData = new FormData();
  formData.append('template', template);
  
  return axios.post(`/api/reports/${reportId}/templates`, formData)
    .then(res => res.data);
}

export const updateReportTemplate = (reportId, templateid, template) => {
  const formData = new FormData();
  formData.append('template', template);
  
  return axios.put(`/api/reports/${reportId}/templates/${templateid}`, formData)
    .then(res => res.data);
}

export const deleteReportTemplate = (reportId, templateid) => {
  return axios.delete(`/api/reports/${reportId}/templates/${templateid}`);
}

export const getReportTemplateDataById = (reportId, templateId) => {
  return axios.get(`/api/reports/${reportId}/templates/${templateId}/data`, { responseType: 'blob' })
    .then(res => new File([res.data], 'fileName'));
}