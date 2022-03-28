import { render, RenderOptions } from "@testing-library/react"; //jest-ignore
import { i18n } from "configs/i18next-tests.config";
import { ThemeProvider } from "contexts/theme.ctx";
import React, { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
