export const IDENTITY_CONFIG = {
  schemes: process.env.REACT_APP_AUTH_SCHEMES,
  identityScheme: 'Identity',
  stTicketScheme: 'StTicket',
  authority: process.env.REACT_APP_AUTH_URL,
  client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URL,
  response_type: "id_token token",
  scope: "openid profile softrust_report_api",
  post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL,
  silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URL,
};