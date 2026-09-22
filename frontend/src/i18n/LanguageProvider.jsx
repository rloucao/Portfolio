import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DICTIONARIES, LANGUAGES, LanguageContext } from "./useLanguage";

const STORAGE_KEY = "lang";

// A saved choice wins; otherwise Portuguese browsers get Portuguese and
// everyone else gets English.
const initialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode, disabled cookies); fall through.
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
};

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(initialLanguage);
  const t = DICTIONARIES[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not persisting is fine; the choice still holds for this visit.
    }

    // Copy length differs between languages, so every scroll-linked
    // animation needs its start/end positions measured again.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LanguageProvider;
