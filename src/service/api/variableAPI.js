import fetchApi from './fetchApi';

export const getSelectData = (dataSource, context, query, valueField, value) => {
  const formData = new FormData();
  
  formData.append('dataSource', JSON.stringify(dataSource));
  formData.append('context', JSON.stringify(context));
  formData.append('query', `select top 100 * from (${query}) ${valueField}Tmp where ${valueField} like '%${value}%'`);
  
  return fetchApi(`/api/variableType/select/data`, {
      method: 'POST',
      body: formData
    }).then(res => res.json());
}