import { SiGithub, SiLinkedin, SiStrava } from "react-icons/si";
import { useLanguage } from "../../i18n/useLanguage";
import { LINKS } from "../../content/projects";
import MagneticLink from "../ui/MagneticLink";
import "../../styles/footer.css";

// One wave period is 200 units; 12 periods fill a 2400-unit strip, which the
// CSS slides by half its width so the loop has no seam.
const PERIODS = 12;
const crest = Array.from({ length: PERIODS * 2 - 1 }, (_, i) => `T ${(i + 2) * 100} 24`).join(" ");
const WAVE_LINE = `M0 24 Q 50 10 100 24 ${crest}`;
const WAVE_FILL = `${WAVE_LINE} L 2400 0 L 0 0 Z`;

const Shore = () => (
  <div className="shore" aria-hidden="true">
    {["back", "front"].map((layer) => (
      <svg
        key={layer}
        className={`wave wave-${layer}`}
        viewBox="0 0 2400 48"
        preserveAspectRatio="none"
      >
        <path className="wave-sand" d={WAVE_FILL} />
        <path className="wave-foam" d={WAVE_LINE} />
      </svg>
    ))}
  </div>
);

/**
 * Sits behind <main> (see .footer in footer.css): as the page scrolls to its
 * end, the content lifts away and the sea is already waiting underneath.
 */
const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <Shore />
      <div className="container footer-inner">
        <p className="status on-sea">
          <span className="status-dot" aria-hidden="true" />
          {t.status}
        </p>
        <h2 className="footer-title">{t.footer.title}</h2>
        <div>
          <MagneticLink href={`mailto:${LINKS.email}`} className="btn btn-foam">
            {LINKS.email}
          </MagneticLink>
        </div>
        <div className="footer-bottom">
          <ul className="footer-socials">
            <li>
              <a className="github" href={LINKS.github} target="_blank" rel="noopener noreferrer">
                <SiGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a className="linkedin" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                <SiLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a className="strava" href={LINKS.strava} target="_blank" rel="noopener noreferrer">
                <SiStrava aria-hidden="true" /> Strava
              </a>
            </li>
          </ul>
          <a href="#top" className="footer-top">
            {t.footer.back} <span aria-hidden="true">↑</span>
          </a>
          <small>© {new Date().getFullYear()} Rodrigo Loução</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
