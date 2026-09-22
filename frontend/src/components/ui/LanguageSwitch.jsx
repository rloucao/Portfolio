import { LANGUAGES, useLanguage } from "../../i18n/useLanguage";

const LanguageSwitch = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label={t.langSwitch}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code === "pt" ? "pt-PT" : "en"}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
