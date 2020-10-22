import axios from 'axios'

export const getReports = (name) => {
  return axios.get(`/api/reports?name=${name}`)
    .then(res => res.data);
}

export const getReportById = (id) => {  
  return axios.get(`/api/reports/${id}`)
    .then(res => res.data);
}

export const addReport = (value) => {
  return axios.post('/api/reports', value)
    .then(res => res.data);
}

export const updateReport = (id, value) => {
  return axios.put(`/api/reports/${id}`, value)
    .then(res => res.data);
}

export const deleteReport = (id) => {
  return axios.delete(`/api/reports/${id}`);
}

export const runReport = (report, template, variables) => {
  const formData = new FormData();
  
  formData.append('report', JSON.stringify(report));
  formData.append('template', template.data);
  formData.append('variableValues', 
    JSON.stringify(variables.map(variable => { 
      return { name: variable.name, value: variable.value } 
    }
  )));

  return axios.post('/api/run/report', formData, { responseType: 'blob' })
    .then(res => new File([res.data], 'fileName'));
}

export const runReportById = (reportId, variables) => {
  const formData = new FormData();
  
  formData.append('variableValues', 
    JSON.stringify(variables.map(variable => { 
      return { name: variable.name, value: variable.value } 
    }
  )));

  return axios.post(`/api/run/report/${reportId}`, formData, { responseType: 'blob' })
    .then(res => new File([res.data], 'fileName'));
}