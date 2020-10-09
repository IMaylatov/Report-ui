export const getSqlQueryItems = (dataSourceId, query, valueField, value) => {
  return fetch(`/api/dataSources/${dataSourceId}/dataSets/sqlQuery/items?query=${query}&valueField=${valueField}&value=${value}&take=100`)
    .then(res => res.json());
}