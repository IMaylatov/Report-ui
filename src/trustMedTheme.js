import { createMuiTheme } from '@material-ui/core/styles';
import { ptRootUi, ptRootUiBold, ptRootUiLight, ptRootUiMedium } from './assets/fonts/ptRootUI';
import { todoc } from './assets/fonts/todoc';
import './assets/fonts/todoc/style.css';

export const trustMedTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#39BFDE',
      dark: '#36B5DB',
      contrastText: '#ffffff'
    },    
    secondary: {
      main: '#FF4400',
      dark: '#FF4400',
      contrastText: '#ffffff'
    },
  },
  typography: {
    fontFamily: 'PTRootUI, Arial',
    fontSize: 14,
    h1: {
      fontFamily: 'PTRootUI-Bold',
      fontSize: '28px',
      lineHeight: '36px',
      color: '#254552'
    },
    h2: {
      fontFamily: 'PTRootUI-Medium',
      fontSize: '18px',
      lineHeight: '24px'
    },
    h3: {
      fontFamily: 'PTRootUI-Medium',
      fontSize: '16px',
      lineHeight: '22px'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [ptRootUi, ptRootUiBold, ptRootUiLight, ptRootUiMedium, todoc],
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#5c7c96'
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        fontSize: '1rem'
      }
    }
  },
});