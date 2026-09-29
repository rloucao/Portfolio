import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../i18n/useLanguage";
import { PROJECTS } from "../../content/projects";
import { isJumping } from "../../hooks/useSmoothScroll";
import "../../styles/work.css";

gsap.registerPlugin(useGSAP);

// A real pointer that can hover gets the floating preview; touch screens get
// the scroll-driven version instead. Decided by input, not screen width, so a
// tablet without a mouse is treated like a phone.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const onChange = (e) => setMatches(e.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

// Plays only while the video is on screen, so several autoplaying videos don't
// all decode at once. A collapsed row clips it to nothing, which counts as off
// screen. Falls back to the poster when motion is unwelcome.
const ProjectMedia = ({ title, image, video }) => {
  const videoRef = useRef(null);
  const reduced = useMediaQuery(REDUCED_QUERY);

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

/**
 * One line of the index. The name opens the full write-up below it. On touch
 * screens the row also has a middle state: once scrolled to, its video slides
 * open under the name, and it stays open so rows above never shrink and jolt
 * the page.
 */
const WorkRow = ({ project, index, open, active, revealed, onToggle, onHover }) => {
  const { t } = useLanguage();
  const copy = t.work.projects[project.id];
  const title = project.title ?? copy.title;
  const bodyId = `work-row-${project.id}`;

  const classes = ["work-row"];
  if (open) classes.push("is-open");
  if (active) classes.push("is-active");
  if (revealed) classes.push("is-revealed");

  return (
    <li className={classes.join(" ")} data-index={index} onMouseEnter={() => onHover(index)}>
      <h3 className="work-row-head">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => onToggle(index)}
        >
          <span className="work-row-num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="work-row-title">{title}</span>
          <span className="work-row-tag">
            {copy.tag}
            {project.status === "testing" && <span className="badge">{t.work.testing}</span>}
          </span>
          <span className="work-row-icon" aria-hidden="true" />
        </button>
      </h3>

      <div className="work-row-reveal">
        <div className="work-row-body" id={bodyId}>
          <div className={`work-row-media${project.portrait ? " is-portrait" : ""}`}>
            <ProjectMedia title={title} image={project.image} video={project.video} />
          </div>

          {/* Folded away until opened; inert so its link can't be tabbed to
              while hidden. */}
          <div className="work-row-fold" inert={open ? undefined : ""}>
            <div className="work-row-details">
              <p className="work-row-summary">{copy.summary}</p>

              {copy.points.length > 0 && (
                <div className="work-row-built">
                  <h4 className="label">{t.work.built}</h4>
                  <ul className="work-row-points">
                    {copy.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.stack.length > 0 && (
                <ul className="work-row-stack" aria-label={t.work.stack}>
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
          </div>
        </div>
      </div>
    </li>
  );
};

WorkRow.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string.isRequired,
    video: PropTypes.string,
    portrait: PropTypes.bool,
    url: PropTypes.string,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  revealed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

// The desktop preview: a card that trails the cursor over the list, showing
// the hovered project. The "View" bubble on its left edge sits on the cursor,
// so the card hangs to the right of it and leaves the name readable. Only the
// shown layer's video plays.
const PreviewLayer = ({ project, shown, reduced }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    if (shown) element.play().catch(() => {});
    else element.pause();
  }, [shown]);

  return (
    <div className={`work-preview-layer${shown ? " is-shown" : ""}`}>
      {project.video && !reduced ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.image}
          muted
          loop
          playsInline
          preload="none"
        />
      ) : (
        <img src={project.image} alt="" />
      )}
    </div>
  );
};

PreviewLayer.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    video: PropTypes.string,
  }).isRequired,
  shown: PropTypes.bool.isRequired,
  reduced: PropTypes.bool.isRequired,
};

// Touch screens: the row crossing the middle of the screen is the active one.
// Every row that has been active stays revealed.
const useCenterRow = (listRef, enabled) => {
  const [active, setActive] = useState(-1);
  const [revealed, setRevealed] = useState(() => new Set());

  useEffect(() => {
    if (!enabled) return;
    const rows = Array.from(listRef.current.querySelectorAll(".work-row"));
    // Rows in the band right now. A row growing above can push another out
    // without either one entering, so the answer comes from this, not from
    // whichever row entered last.
    const inBand = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) inBand.add(index);
          else inBand.delete(index);
        });
        // Between two rows the band touches neither; keep the last one lit.
        // A link jump flying past doesn't count as reading them.
        if (inBand.size === 0 || isJumping()) return;
        const index = Math.min(...inBand);
        setActive(index);
        setRevealed((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
      },
      // A thin band across the middle of the screen.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [listRef, enabled]);

  return enabled ? { active, revealed } : { active: -1, revealed: new Set() };
};

const Work = () => {
  const { t } = useLanguage();
  const canHover = useMediaQuery(HOVER_QUERY);
  const reduced = useMediaQuery(REDUCED_QUERY);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const [hovered, setHovered] = useState(-1);
  const [open, setOpen] = useState(() => new Set());
  const { active, revealed } = useCenterRow(listRef, !canHover);

  // Floating preview only where there's a mouse and motion is welcome.
  const floating = canHover && !reduced;

  const { contextSafe } = useGSAP(
    () => {
      if (!floating) return;
      gsap.set(previewRef.current, {
        xPercent: 0,
        yPercent: -50,
        transformOrigin: "0% 50%",
        scale: 0.8,
        autoAlpha: 0,
      });
    },
    { dependencies: [floating], revertOnUpdate: true },
  );

  const follow = useRef(null);
  useEffect(() => {
    if (!floating) return;
    const el = previewRef.current;
    follow.current = {
      x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" }),
      rotation: gsap.quickTo(el, "rotation", { duration: 0.6, ease: "power3" }),
      lastX: null,
      settle: null,
    };
    return () => follow.current?.settle?.kill();
  }, [floating]);

  const onMove = (e) => {
    const f = follow.current;
    if (!floating || !f) return;
    f.x(e.clientX);
    f.y(e.clientY);
    // Leans into the direction of travel, like it's being dragged along, and
    // straightens up once the cursor rests.
    if (f.lastX !== null) f.rotation(gsap.utils.clamp(-8, 8, (e.clientX - f.lastX) * 0.6));
    f.lastX = e.clientX;
    f.settle?.kill();
    f.settle = gsap.delayedCall(0.08, () => f.rotation(0));
  };

  const show = contextSafe((visible) => {
    gsap.to(previewRef.current, {
      autoAlpha: visible ? 1 : 0,
      scale: visible ? 1 : 0.8,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  // Hidden over an open row: its video is already on the page.
  const previewVisible = floating && hovered >= 0 && !open.has(hovered);

  const toggle = (index) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  useEffect(() => {
    if (floating) show(previewVisible);
  }, [floating, previewVisible, show]);

  return (
    <section id="work" className="section work">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 className="section-title">{t.work.title}</h2>
        </header>

        <ol
          ref={listRef}
          className={`work-index ${canHover ? "is-hover" : "is-touch"}`}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(-1)}
        >
          {PROJECTS.map((project, index) => (
            <WorkRow
              key={project.id}
              project={project}
              index={index}
              open={open.has(index)}
              active={active === index}
              revealed={revealed.has(index)}
              onToggle={toggle}
              onHover={setHovered}
            />
          ))}
        </ol>
      </div>

      {floating && (
        <div className="work-preview" ref={previewRef} aria-hidden="true">
          {PROJECTS.map((project, index) => (
            <PreviewLayer
              key={project.id}
              project={project}
              shown={hovered === index}
              reduced={reduced}
            />
          ))}
          <span className="work-preview-cta">{t.work.view}</span>
        </div>
      )}
    </section>
  );
};

export default Work;
