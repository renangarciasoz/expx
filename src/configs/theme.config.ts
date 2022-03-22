import { createTheme, responsiveFontSizes } from "@mui/material";

const globalTheme = {
  props: {
    MuiUseMediaQuery: {
      ssrMatchMedia: "0px",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "10px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          transition: "color 0.5s",
        },
      },
    },
  },
  typography: {
    fontFamily: "'Sora', 'sans-serif'",
    button: {
      textTransform: "none",
    },
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: "#1979FF",
      light: "#579DFF",
      dark: "#0059D6",
      contrastText: "#FFFFFF",
    },
  },
};

export const themeLight = responsiveFontSizes(createTheme({ ...globalTheme }));
export const themeDark = responsiveFontSizes(
  createTheme({
    ...globalTheme,
    palette: {
      ...globalTheme.palette,
      mode: "dark",
      background: {
        default: "#000000",
      },
    },
  })
);
