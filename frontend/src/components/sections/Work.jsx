import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../i18n/useLanguage";
import { PROJECTS } from "../../content/projects";
import "../../styles/work.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The stack itself is just sticky positioning and works for everyone; only
// the shrink-and-dim on top of it is motion.
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

const STACK_STEP = 18; // px each card sits below the previous one
const EDGE = 16; // px of breathing room under the nav and above the fold

/**
 * Where each card sticks. Ideally just under the nav, a step lower than the
 * card before so the pile's edges show. A card taller than the space left
 * would hide its own bottom, so it sticks higher instead — at the point where
 * its bottom edge rests just above the fold, fully read before the next card
 * slides over it.
 */
const useStickyOffsets = (stackRef) => {
  useLayoutEffect(() => {
    const stack = stackRef.current;
    const cards = Array.from(stack.querySelectorAll(".case"));
    let frame = 0;

    const place = () => {
      const nav = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
      );
      cards.forEach((card, i) => {
        const preferred = nav + EDGE + i * STACK_STEP;
        const fits = window.innerHeight - card.offsetHeight - EDGE;
        card.style.setProperty("--stick", `${Math.min(preferred, fits)}px`);
      });
      ScrollTrigger.refresh();
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };

    place();
    // Card heights change with the viewport, web fonts and the language.
    const observer = new ResizeObserver(schedule);
    cards.forEach((card) => observer.observe(card));
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [stackRef]);
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

// Plays only while the card is on screen, so several autoplaying videos don't
// all decode at once. Falls back to the poster when motion is unwelcome.
const ProjectMedia = ({ title, image, video }) => {
  const videoRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced]);

  if (!video || reduced) {
    return <img src={image} alt={title} loading="lazy" />;
  }

  return (
    <video
      ref={videoRef}
      src={video}
      poster={image}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${title} preview`}
    />
  );
};

ProjectMedia.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string,
};

// Stand-in artwork for a project that has no footage yet.
const ChatPlaceholder = ({ label }) => (
  <div className="chat-ph" aria-hidden="true">
    <span className="chat-ph-label">{label}</span>
    <span className="bubble" style={{ width: "58%" }} />
    <span className="bubble me" style={{ width: "44%" }} />
    <span className="bubble" style={{ width: "70%" }} />
    <span className="bubble me" style={{ width: "36%" }} />
  </div>
);

ChatPlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
};

const CaseCard = ({ project, index }) => {
  const { t } = useLanguage();
  const copy = t.work.projects[project.id];
  const title = project.title ?? copy.title;
  const testing = project.status === "testing";

  return (
    <>
      {/* Zero-height marker at the card's natural position. A stuck card
          reports its stuck position, so triggers are measured from here. */}
      <div className="case-marker" aria-hidden="true" />
      <article className="case" style={{ "--i": index }}>
        <div className="case-inner">
          <div className="case-text">
            <p className="case-tag">
              {copy.tag}
              {testing && <span className="badge">{t.work.testing}</span>}
            </p>
            <h3>{title}</h3>
            <p className="case-summary">{copy.summary}</p>

            {copy.points.length > 0 && (
              <div className="case-built">
                <h4 className="label">{t.work.built}</h4>
                <ul className="case-points">
                  {copy.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.stack.length > 0 && (
              <ul className="case-stack" aria-label={t.work.stack}>
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            )}

            {project.url && (
              <a
                className="link-arrow"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.work.visit} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <div className="case-media">
            {project.video || project.image ? (
              <ProjectMedia title={title} image={project.image} video={project.video} />
            ) : (
              <ChatPlaceholder label={t.work.testing} />
            )}
          </div>

          <div className="case-shade" aria-hidden="true" />
        </div>
      </article>
    </>
  );
};

CaseCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.string,
    url: PropTypes.string,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Work = () => {
  const { t } = useLanguage();
  const stackRef = useRef(null);
  useStickyOffsets(stackRef);

  // As each card slides over the previous one, the one underneath shrinks and
  // dims, so the pile reads as depth rather than cards simply overlapping.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        const cards = gsap.utils.toArray(".case", stackRef.current);
        const markers = gsap.utils.toArray(".case-marker", stackRef.current);

        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const stuckAt = () => parseFloat(getComputedStyle(next).top);

          gsap
            .timeline({
              scrollTrigger: {
                trigger: markers[i + 1],
                start: "top bottom",
                end: () => `top ${stuckAt()}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to(card.querySelector(".case-inner"), { scale: 0.92, ease: "none" }, 0)
            .to(card.querySelector(".case-shade"), { opacity: 1, ease: "none" }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: stackRef },
  );

  return (
    <section id="work" className="section work">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 className="section-title">{t.work.title}</h2>
        </header>
        <div className="stack" ref={stackRef}>
          {PROJECTS.map((project, index) => (
            <CaseCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
