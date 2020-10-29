import fetchApi, { updateOptions } from './fetchApi';

export const getUserById = (id) => {  
  return fetch(`/api/users/${id}`, updateOptions({}));
}

export const addUser = (value) => {
  return fetchApi('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(res => res.json());
}