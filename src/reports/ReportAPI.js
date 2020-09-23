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
      connectionString: 'connectionString1'
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
            query: "select * from users"
          }
        }
      ],
      parameters: [
        {
          id: 1,
          name: 'Parameter1',
          label: 'int Параметр',
          type: 'int',
          kind: 'value'
        }
      ],
      template: {
        id: 1,
        name: 'Template1',
        type: 'closedXml',
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

export const runReport = (value) => {  
  return new Promise((resolve, reject) => {
    return resolve(value);
  });
}