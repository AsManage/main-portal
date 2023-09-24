import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "locales/en/translation.json";
import translationVI from "locales/vi/translation.json";

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: { translation: translationEN },
      vi: { translation: translationVI },
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
