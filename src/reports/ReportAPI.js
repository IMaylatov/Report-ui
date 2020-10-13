export const getReports = () => {
  return fetch("/api/reports")
    .then(res => res.json());
}

export const getReportById = (id) => {  
  return fetch(`/api/reports/${id}`)
    .then(res => res.json());
}

export const addReport = (value) => {
  return fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(res => res.json());
}

export const updateReport = (id, value) => {
  return fetch(`/api/reports/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(res => res.json());
}

export const deleteReport = (id) => {
  return fetch(`/api/reports/${id}`, {
      method: 'DELETE'
    });
}

export const runReport = (report, template, variables) => {
  const formData = new FormData();
  
  formData.append('report', JSON.stringify(report));
  formData.append('template', template.data);
  formData.append('variables', JSON.stringify(variables));

  return fetch('/api/run/report', {
    method: 'POST',
    body: formData
  });
}

export const runReportById = (reportId, variables) => {
  const formData = new FormData();
  
  formData.append('variables', JSON.stringify(variables));

  return fetch(`/api/run/report/${reportId}`, {
    method: 'POST',
    body: formData
  });
}