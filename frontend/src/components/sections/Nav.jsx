import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import LanguageSwitch from "../ui/LanguageSwitch";
import "../../styles/nav.css";

const Nav = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  // The bar is transparent over the hero and gains a backdrop once content
  // starts passing underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-name">
          Rodrigo Loução
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#work">{t.nav.work}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#process">{t.nav.process}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="nav-actions">
          <LanguageSwitch />
          <a href="#contact" className="btn btn-small nav-cta">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Nav;
