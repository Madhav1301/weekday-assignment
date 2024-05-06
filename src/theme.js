import { createTheme } from '@mui/material'

export default createTheme({
  typography: {
    fontFamily: 'Lexend, san-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Lexend';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
})
