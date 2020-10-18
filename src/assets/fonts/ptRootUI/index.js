import PTRootUIWoff2 from './PTRootUI-Regular.woff2';
import PTRootUIBoldWoff2 from './PTRootUI-Bold.woff2';
import PTRootUILightWoff2 from './PTRootUI-Light.woff2';
import PTRootUIMediumWoff2 from './PTRootUI-Medium.woff2';

export const ptRootUi = {
  fontFamily: 'PTRootUI',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('PTRootUI'),
    local('PTRootUI-Regular'),
    url(${PTRootUIWoff2}) format('woff2')
  `
};

export const ptRootUiBold = {
  fontFamily: 'PTRootUI-Bold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('PTRootUI'),
    local('PTRootUI-Bold'),
    url(${PTRootUIBoldWoff2}) format('woff2')
  `
};

export const ptRootUiLight = {
  fontFamily: 'PTRootUI-Light',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('PTRootUI'),
    local('PTRootUI-Light'),
    url(${PTRootUILightWoff2}) format('woff2')
  `
};

export const ptRootUiMedium = {
  fontFamily: 'PTRootUI-Medium',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('PTRootUI'),
    local('PTRootUI-Medium'),
    url(${PTRootUIMediumWoff2}) format('woff2')
  `
};