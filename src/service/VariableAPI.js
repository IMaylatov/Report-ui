import { fetchApi } from './fetchHandleError';

export const getSelectData = (dataSource, query, valueField, value) => {
  const formData = new FormData();
  
  formData.append('dataSource', JSON.stringify(dataSource));
  formData.append('query', query);
  formData.append('valueField', valueField);
  formData.append('value', value);
  formData.append('take', 100);
  
  return fetchApi(`/api/variableType/select/data`, {
      method: 'POST',
      body: formData
    }).then(res => res.json());
}