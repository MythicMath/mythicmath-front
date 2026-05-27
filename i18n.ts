import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

async function initializeI18n() {
  const savedLanguage = await AsyncStorage.getItem("lang");

  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      pt: {
        translation: pt,
      },
    },

    lng: savedLanguage || "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
}

export const i18nInitialization = initializeI18n();

export default i18n;