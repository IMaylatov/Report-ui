import axios from 'axios'

export const getSelectData = (dataSource, query, valueField, value) => {
  const formData = new FormData();
  
  formData.append('dataSource', JSON.stringify(dataSource));
  formData.append('query', query);
  formData.append('valueField', valueField);
  formData.append('value', value);
  formData.append('take', 100);
  
  return axios.post(`/api/variableType/select/data`, formData)
    .then(res => res.data);
}