import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

const PULL = 0.35; // how far the button follows the pointer
const LABEL_PULL = 0.18; // the label moves less, which reads as depth

/**
 * A link that leans toward the pointer while it is nearby. The outer span is
 * the "field": it is padded beyond the button so the pull starts before the
 * pointer reaches the edge. Mouse only, and off for reduced motion.
 */
const MagneticLink = ({ href, children, className = "", ...rest }) => {
  const fieldRef = useRef(null);
  const buttonRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    const button = buttonRef.current;
    const label = labelRef.current;

    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const opts = { duration: 0.4, ease: "power3.out" };
      const bx = gsap.quickTo(button, "x", opts);
      const by = gsap.quickTo(button, "y", opts);
      const lx = gsap.quickTo(label, "x", opts);
      const ly = gsap.quickTo(label, "y", opts);

      const onMove = (e) => {
        const r = button.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        bx(dx * PULL);
        by(dy * PULL);
        lx(dx * LABEL_PULL);
        ly(dy * LABEL_PULL);
      };

      const onLeave = () => {
        const spring = { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" };
        gsap.to(button, spring);
        gsap.to(label, spring);
      };

      field.addEventListener("pointermove", onMove);
      field.addEventListener("pointerleave", onLeave);
      return () => {
        field.removeEventListener("pointermove", onMove);
        field.removeEventListener("pointerleave", onLeave);
        gsap.set([button, label], { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <span ref={fieldRef} className="magnetic-field">
      <a ref={buttonRef} href={href} className={`magnetic ${className}`} {...rest}>
        <span ref={labelRef} className="magnetic-label">
          {children}
        </span>
      </a>
    </span>
  );
};

MagneticLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MagneticLink;
