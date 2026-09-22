import { useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { FaStrava } from "react-icons/fa";
import { useLanguage } from "../../i18n/useLanguage";
import { LINKS } from "../../content/projects";
import "../../styles/about.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Words light up one by one as the paragraph scrolls through the viewport.
 * Rendered with key={lang} by the parent: SplitText rewrites this node's
 * children, so React must never try to patch them in place — a language
 * change mounts a fresh paragraph instead.
 */
const ScrubText = ({ text }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(ref.current, { type: "words", tag: "span" });
        gsap.fromTo(
          split.words,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className="scrub">
      {text}
    </p>
  );
};

ScrubText.propTypes = {
  text: PropTypes.string.isRequired,
};

const About = () => {
  const { lang, t } = useLanguage();
  const { about } = t;

  return (
    <section id="about" className="section about">
      <div className="container">
        <p className="eyebrow">{about.eyebrow}</p>
        <ScrubText key={lang} text={about.scrub} />
        <div className="about-grid">
          <div className="about-body">
            {about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a
              className="link-arrow strava"
              href={LINKS.strava}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaStrava aria-hidden="true" /> {about.strava}
            </a>
          </div>
          <div className="about-skills">
            <h3 className="label">{about.skillsTitle}</h3>
            <dl>
              {about.skills.map(({ group, items }) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd>{items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
