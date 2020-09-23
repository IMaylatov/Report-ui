import * as dsetConstants from '../dataSets/constants';

export const getReports = () => {
  return new Promise((resolve, reject) => 
    resolve([
      {
        id: 1,
        name: 'Тестовый отчет 1'
      },
      {
        id: 2,
        name: 'Тестовый отчет 2'
      }
    ])
  );
}

export const getReportById = (id) => {  
  const dataSource = {
    id: 1,
    name: 'DataSource1',
    type: 'MsSql',
    data: {
      connectionString: 'Server=172.16.254.62\\dev2014;Database=dev_bel_ba_okb_20181102;User Id=ras;Password=o2LDX;'
    }
  };
  return new Promise((resolve, reject) => 
    resolve({
      id: 1,
      name: 'Тестовый отчет 1',
      dataSources: [ dataSource ],
      dataSets: [
        {
          id: 1,
          name: 'DataSet1',
          type: 'SqlQuery',
          data: {
            dataSource: dataSource,
            query: "select StoreName, Code from ras_Store where storeid = @storeId"
          }
        }
      ],
      parameters: [
        {
          id: 1,
          name: 'storeId',
          label: 'id Склада',
          type: 'int',
          kind: 'value'
        }
      ],
      template: {
        id: 1,
        name: 'Template1',
        type: 'ClosedXml',
        data: {
          file: ''
        }
      }
    })
  );
}

export const addReport = (value) => {
  return new Promise((resolve, reject) => {
    console.log(value);
    return resolve(value);
  });
}

export const updateReport = (id, value) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    console.log(value);
    return resolve(value);
  });
}

export const runReport = (report) => {
  const formData = new FormData();

  formData.append('parameters', JSON.stringify(report.parameters.map(parameter => {
    return {
      name: parameter.name,
      value: parameter.value
    }
  })));
  formData.append('dataSources', JSON.stringify(report.dataSources.map(dataSource => {
    return {
      name: dataSource.name,
      type: dataSource.type,
      data: dataSource.data
    }
  })));
  formData.append('dataSets', JSON.stringify(report.dataSets.map(dataSet => {
    let value = {
      name: dataSet.name,
      type: dataSet.type
    };
    switch(value.type) {
      case dsetConstants.DATASET_TYPE_SQLQUERY:
        value.data = {
          dataSourceName: dataSet.data.dataSource.name,
          query: dataSet.data.query
        };
        break;
      default:
        break;
    }
    return value;
  })));
  formData.append('templateType', report.template.type);
  formData.append('template', report.template.data.file);

  return fetch('/api/reports/run', {
    method: 'POST',
    body: formData
  });
}