import TodocWoff from './todoc.woff';

export const todoc = {
  fontFamily: 'Todoc',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Todoc'),
    url(${TodocWoff}) format('woff')
  `
};