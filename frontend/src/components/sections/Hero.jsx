import { useRef } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import MagneticLink from "../ui/MagneticLink";
import photo from "../../assets/rodrigo.jpg";
import "../../styles/hero.css";

const Hero = () => {
  const { t } = useLanguage();
  const dialogRef = useRef(null);

  // On phones the portrait shrinks to an avatar beside the status line;
  // tapping it opens the full photo in a modal.
  const openPhoto = () => {
    document.documentElement.classList.add("is-dialog-open");
    dialogRef.current?.showModal();
  };

  const closePhoto = () => dialogRef.current?.close();

  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <div className="hero-status" style={{ "--d": 0 }}>
            <button
              type="button"
              className="avatar-btn"
              onClick={openPhoto}
              aria-label={t.hero.photoOpen}
              aria-haspopup="dialog"
            >
              <img src={photo} alt="" width="900" height="1200" />
            </button>
            <p className="status">
              <span className="status-dot" aria-hidden="true" />
              {t.status}
            </p>
          </div>
          <p className="eyebrow" style={{ "--d": 1 }}>
            {t.hero.eyebrow}
          </p>
          <h1 style={{ "--d": 2 }}>{t.hero.title}</h1>
          <p className="lede" style={{ "--d": 3 }}>
            {t.hero.lede}
          </p>
          <div className="hero-ctas" style={{ "--d": 4 }}>
            <MagneticLink href="#contact" className="btn btn-primary">
              {t.hero.primary} <span aria-hidden="true">→</span>
            </MagneticLink>
            <a href="#work" className="link-arrow">
              {t.hero.secondary} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <figure className="hero-photo">
          <img src={photo} alt={t.hero.photoAlt} width="900" height="1200" />
        </figure>
      </div>

      {/* Clicks on the backdrop land on the <dialog> itself (the image fills
          the rest), so that is how "tap outside to close" is detected.
          data-lenis-prevent hands wheel events back to the browser, where the
          page's overflow lock stops the page behind from scrolling. */}
      <dialog
        ref={dialogRef}
        className="photo-dialog"
        aria-label={t.hero.photoAlt}
        data-lenis-prevent
        onClick={(e) => e.target === e.currentTarget && closePhoto()}
        onClose={() => document.documentElement.classList.remove("is-dialog-open")}
      >
        <img src={photo} alt={t.hero.photoAlt} width="900" height="1200" />
        <button
          type="button"
          className="photo-close"
          onClick={closePhoto}
          aria-label={t.hero.photoClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </dialog>
    </section>
  );
};

export default Hero;
