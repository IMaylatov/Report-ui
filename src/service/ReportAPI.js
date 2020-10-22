import { fetchApi } from './fetchHandleError';
import axios from 'axios'

export const getReports = (name) => {
  return axios.get(`/api/reports?name=${name}`)
    .then(res => res.data);
}

export const getReportById = (id) => {  
  return fetchApi(`/api/reports/${id}`)
    .then(res => res.json());
}

export const addReport = (value) => {
  return fetchApi('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(res => res.json());
}

export const updateReport = (id, value) => {
  return fetchApi(`/api/reports/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(res => res.json());
}

export const deleteReport = (id) => {
  return fetchApi(`/api/reports/${id}`, {
      method: 'DELETE'
    });
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

  return fetchApi('/api/run/report', {
      method: 'POST',
      body: formData
    });
}

export const runReportById = (reportId, variables) => {
  const formData = new FormData();
  
  formData.append('variableValues', 
    JSON.stringify(variables.map(variable => { 
      return { name: variable.name, value: variable.value } 
    }
  )));

  return fetchApi(`/api/run/report/${reportId}`, {
      method: 'POST',
      body: formData
    });
}