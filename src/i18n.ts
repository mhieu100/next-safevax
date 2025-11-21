"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en/common.json";
import vi from "../public/locales/vi/common.json";

const LANGUAGE_KEY = "lang";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    vi: { common: vi },
  },
  lng:
    typeof window !== "undefined"
      ? localStorage.getItem(LANGUAGE_KEY) || "en"
      : "en",
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem(LANGUAGE_KEY, lang);
};

export default i18n;
