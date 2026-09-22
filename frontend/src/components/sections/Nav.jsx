import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import LanguageSwitch from "../ui/LanguageSwitch";
import "../../styles/nav.css";

// Scroll this far past the top before the bar may shrink, and ignore
// movements smaller than the jitter threshold (trackpads and iOS bounce).
const COMPACT_AFTER = 120;
const JITTER = 6;

const Nav = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      if (y <= COMPACT_AFTER) {
        setCompact(false);
      } else if (Math.abs(y - lastY) >= JITTER) {
        setCompact(y > lastY);
      } else {
        return; // too small to count; keep lastY so small moves add up
      }
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard users tabbing into a shrunken bar get the full bar back, so
  // focus never lands on a hidden link.
  const isCompact = compact && !focused;

  return (
    <header
      className={`nav${scrolled ? " is-scrolled" : ""}${isCompact ? " is-compact" : ""}`}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
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
