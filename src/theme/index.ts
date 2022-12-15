import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// component overrides
import ComponentsOverrides from './overrides';

// Create a theme instance.

const contrastText = '#fff';
const { blue, red, gold, cyan, green, grey } = presetPalettes;

const greyColors = {
  0: grey[0],
  50: grey[1],
  100: grey[2],
  200: grey[3],
  300: grey[4],
  400: grey[5],
  500: grey[6],
  600: grey[7],
  700: grey[8],
  800: grey[9],
  900: grey[10],
  A50: grey[15],
  A100: grey[11],
  A200: grey[12],
  A400: grey[13],
  A700: grey[14],
  A800: grey[16]
};

const theme = createTheme({
  palette: {
    primary: {
      50: blue[0],
      100: blue[1],
      200: blue[2],
      light: blue[3],
      400: blue[4],
      main: blue[5],
      dark: blue[6],
      700: blue[7],
      800: blue[8],
      900: blue[9],
      contrastText
    },
    secondary: {
      50: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500],
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      900: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A400: greyColors.A700,
      contrastText: greyColors[0]
    },
    error: {
      50: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      900: red[9],
      contrastText
    },
    warning: {
        50: gold[0],
        light: gold[3],
        main: gold[5],
        dark: gold[7],
        900: gold[9],
        contrastText: greyColors[100]
    },
    info: {
        50: cyan[0],
        light: cyan[3],
        main: cyan[5],
        dark: cyan[7],
        900: cyan[9],
        contrastText
    },
    success: {
        50: green[0],
        light: green[3],
        main: green[5],
        dark: green[7],
        900: green[9],
        contrastText
    },
    grey: greyColors
  },
  typography: {
    fontFamily: ['"Raleway"', 'sans-serif'].join(','),
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.21
    },
    h2: {
        fontWeight: 600,
        fontSize: '1.875rem',
        lineHeight: 1.27
    },
    h3: {
        fontWeight: 700,
        fontSize: '1.5rem',
        lineHeight: 1.33
    },
    h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4
    },
    h5: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.5
    },
    h6: {
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.57
    },
    caption: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66
    },
    body1: {
        fontSize: '1.2rem',
        lineHeight: 1.57
    },
    body2: {
        fontSize: '1rem',
        lineHeight: 1.66
    },
    subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.57
    },
    subtitle2: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.66
    },
    overline: {
        lineHeight: 1.66
    },
    button: {
        textTransform: 'capitalize'
    }
  }
});


theme.components = ComponentsOverrides(theme)
export default theme;