import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18n as i18nConfig } from "../../next-i18next.config";

const ns = ["common"];
const supportedLngs = ["en"];

i18n.use(initReactI18next).init({
  ...i18nConfig,
  lng: "en",
  ns,
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

supportedLngs.forEach((lang) => {
  ns.forEach(async (n) => {
    const languageFiles = await import(
      `../../public/locales/${lang}/${n}.json`
    );
    i18n.addResourceBundle(lang, n, languageFiles);
  });
});

export { i18n };
