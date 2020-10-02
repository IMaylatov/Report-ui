import * as dataSetConstants from '../dataSets/constants';

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

export const runReport = (report, template) => {
  const formData = new FormData();
  
  formData.append('report', JSON.stringify({
    type: report.type,
    dataSources: report.dataSources.map(dataSource => {
      return {
        name: dataSource.name,
        type: dataSource.type,
        data: dataSource.data
      };
    }),
    variables: report.variables.map(variable => {
      return {
        name: variable.name,
        value: variable.value
      }
    }),
    dataSets: report.dataSets.map(dataSet => {
      let value = {
        name: dataSet.name,
        type: dataSet.type
      };
      switch(value.type) {
        case dataSetConstants.DATASET_TYPE_SQLQUERY:
          value.data = {
            dataSourceName: dataSet.data.dataSourceName,
            query: dataSet.data.query
          };
          break;
        default:
          break;
      }
      return value;
    })
  }));
  formData.append('template', template.data);

  return fetch('/api/run/report', {
    method: 'POST',
    body: formData
  });
}