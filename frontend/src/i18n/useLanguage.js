import { createContext, useContext } from "react";
import en from "../content/en";
import pt from "../content/pt";

export const DICTIONARIES = { en, pt };
export const LANGUAGES = ["en", "pt"];

export const LanguageContext = createContext({
  lang: "en",
  t: en,
  setLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);
