export const getDataSources = () => {
  return fetch("/api/dataSources")
    .then(res => res.json());
}

export const getDataSourcetById = (id) => {  
  return fetch(`/api/dataSources/${id}`)
    .then(res => res.json());
}

export const addDataSource = (value) => {
  return fetch('/api/dataSources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(res => res.json());
}

export const updateDataSource = (id, value) => {
  return fetch(`/api/dataSources/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(res => res.json());
}


export const deleteDataSource = (id) => {
  return fetch(`/api/dataSources/${id}`, {
      method: 'DELETE'
    });
}