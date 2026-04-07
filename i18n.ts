import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function initI18n() {
  const savedLang = await AsyncStorage.getItem("lang");

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: savedLang || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export { initI18n };
export default i18n;