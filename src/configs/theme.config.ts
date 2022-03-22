import { createTheme, responsiveFontSizes } from "@mui/material";

const globalTheme = {
  props: {
    MuiUseMediaQuery: {
      ssrMatchMedia: "0px",
    },
  },
  components: {
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
};

export const themeLight = responsiveFontSizes(createTheme({ ...globalTheme }));
export const themeDark = responsiveFontSizes(
  createTheme({ ...globalTheme, palette: { mode: "dark" } })
);
