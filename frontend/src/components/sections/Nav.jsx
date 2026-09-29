import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { LINKS } from "../../content/projects";
import { lockScroll, scrollToHash } from "../../hooks/useSmoothScroll";
import LanguageSwitch from "../ui/LanguageSwitch";
import "../../styles/nav.css";

// Scroll this far past the top before the bar may shrink, and ignore
// movements smaller than the jitter threshold (trackpads and iOS bounce).
const COMPACT_AFTER = 120;
const JITTER = 6;

// Where the links go. Experience has no link, but it's listed so that while
// it's on screen no link claims to be the current section.
const SECTIONS = ["work", "experience", "about", "process", "contact"];
const LINKED = ["work", "about", "process", "contact"];

// Phones get the full-screen menu instead of the inline links.
const MENU_QUERY = "(max-width: 800px)";

// Local time in Lisbon, so visitors elsewhere know when a reply is likely.
const lisbonTime = (lang) =>
  new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon",
  }).format(new Date());

const useLisbonTime = (lang) => {
  const [time, setTime] = useState(() => lisbonTime(lang));

  useEffect(() => {
    setTime(lisbonTime(lang));
    const id = setInterval(() => setTime(lisbonTime(lang)), 15_000);
    return () => clearInterval(id);
  }, [lang]);

  return time;
};

const Nav = () => {
  const { t, lang } = useLanguage();
  const time = useLisbonTime(lang);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [focused, setFocused] = useState(false);
  const [current, setCurrent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 8);

      // Reading progress along the bottom edge; set directly, no re-render.
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }

      // The current section is the last one whose top has passed 40% of the
      // screen. At the very bottom, the last section wins even if it's short.
      let found = null;
      if (y >= max - 2) {
        found = SECTIONS[SECTIONS.length - 1];
      } else {
        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) found = id;
        }
      }
      setCurrent(found);

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
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // While the menu is open: the page underneath can't scroll or be tabbed
  // into, Escape closes it, and focus moves in and back out again.
  useEffect(() => {
    if (!menuOpen) return;
    const behind = document.querySelectorAll("main, footer");
    const button = menuButtonRef.current;

    lockScroll(true);
    behind.forEach((el) => (el.inert = true));
    menuRef.current?.querySelector("a")?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const wide = window.matchMedia(MENU_QUERY);
    const onWide = (e) => {
      if (!e.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);

    return () => {
      lockScroll(false);
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      button?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  // Unlock right away (the effect cleanup would only do it after the next
  // render, and a stopped Lenis ignores the jump), then close and travel.
  const goFromMenu = (e) => {
    e.preventDefault();
    lockScroll(false);
    setMenuOpen(false);
    scrollToHash(e.currentTarget.getAttribute("href"));
  };

  // Keyboard users tabbing into a shrunken bar get the full bar back, so
  // focus never lands on a hidden link.
  const isCompact = compact && !focused && !menuOpen;

  const classes = ["nav"];
  if (scrolled) classes.push("is-scrolled");
  if (isCompact) classes.push("is-compact");
  if (menuOpen) classes.push("is-menu-open");

  return (
    <>
      <header
        className={classes.join(" ")}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
      >
        <div className="container nav-inner">
          <div className="nav-brand">
            <a href="#top" className="nav-name">
              Rodrigo Loução
            </a>
            <p className="nav-status">
              <span className="nav-dot" aria-hidden="true" />
              {t.nav.available} · {t.nav.city}{" "}
              <time dateTime={time}>{time}</time>
            </p>
          </div>

          <nav className="nav-links" aria-label="Primary">
            {LINKED.map((id, i) => (
              <a key={id} href={`#${id}`} aria-current={current === id ? "location" : undefined}>
                <span className="nav-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <LanguageSwitch />
            <a href="#contact" className="btn btn-small nav-cta">
              {t.nav.cta} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="nav-menu-button"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? t.nav.close : t.nav.menu}
            <span className="nav-burger" aria-hidden="true" />
          </button>
        </div>
        <span className="nav-progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div
        id="nav-menu"
        ref={menuRef}
        className={`nav-menu${menuOpen ? " is-open" : ""}`}
        inert={menuOpen ? undefined : ""}
      >
        <div className="container nav-menu-inner">
          <nav aria-label="Primary">
            <ol className="nav-menu-links">
              {LINKED.map((id, i) => (
                <li key={id} style={{ "--i": i }}>
                  <a
                    href={`#${id}`}
                    onClick={goFromMenu}
                    aria-current={current === id ? "location" : undefined}
                  >
                    <span className="nav-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="nav-menu-foot" style={{ "--i": LINKED.length }}>
            <div className="nav-menu-row">
              <span className="nav-menu-label">{t.nav.language}</span>
              <LanguageSwitch />
            </div>
            <div className="nav-menu-social">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={LINKS.strava} target="_blank" rel="noopener noreferrer">
                Strava
              </a>
            </div>
            <a href="#contact" className="btn nav-menu-cta" onClick={goFromMenu}>
              {t.nav.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
