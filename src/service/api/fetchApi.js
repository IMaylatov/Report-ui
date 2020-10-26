export function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

function updateOptions(options) {
  const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
  const token = oidcStorage?.access_token;

  const update = { ...options };

  if (token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${token}`,
    };
    return update;
  }
  
  const stUser = JSON.parse(localStorage.getItem('st.user'));
  const stHost = stUser?.host;

  if (stHost) {
    update.headers = {
      ...update.headers,
      Authorization: `StHost ${stHost}`,
    };
  }

  return update;
}

export default function fetchApi(url, options) {
  return fetch(url, updateOptions(options))
    .then(handleErrors);
}