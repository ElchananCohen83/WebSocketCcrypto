import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F6C927',
    },
    secondary: {
      main: '#121231',
      light: '#D3D3D3',
    },
    background: { default: '#0A0A1B' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1080,
      xl: 1920,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#F6C927', 
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#F6C927', 
        },
      },
    },
  },
});

export default theme;
