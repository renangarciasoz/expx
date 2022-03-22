import { Theme, ThemeProvider as ThemeProviderMaterial } from "@mui/material";
import { themeDark, themeLight } from "configs/theme.config";
import Head from "next/head";
import React, { createContext, useCallback, useEffect, useState } from "react";

const ThemeContext = createContext(() => {});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(themeDark);
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (window) {
      const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(systemDarkTheme.matches ? themeDark : themeLight);
    }
  }, []);

  const changeTheme = useCallback(() => {
    setTheme(isDark ? themeLight : themeDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={changeTheme}>
      <Head>
        <meta
          name="msapplication-TileColor"
          content={isDark ? "black" : "white"}
        />
        <meta name="theme-color" content={isDark ? "black" : "white"} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={isDark ? "black" : "white"}
        />
      </Head>
      <ThemeProviderMaterial theme={theme}>{children}</ThemeProviderMaterial>
    </ThemeContext.Provider>
  );
};

export const useChangeTheme = () => React.useContext(ThemeContext);
