export function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

export function fetchApi(input, init) {
  return fetch(input, init)
    .then(handleErrors);
}