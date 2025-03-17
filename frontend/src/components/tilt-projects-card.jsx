"use client";
import { useRef, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import PropTypes from "prop-types";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltProjectsCard = ({ scrollPos = 0, image, link }) => {
  const ref = useRef(null);
  const cardOpacity = useMotionValue(0);
  const cardY = useMotionValue(100);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const opacitySpring = useSpring(cardOpacity);
  const yPositionSpring = useSpring(cardY);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  useEffect(() => {
    if (scrollPos >= 350) {
      animate(cardOpacity, 1, { duration: 0.5 });
      animate(cardY, 0, { duration: 0.5 });
    } else {
      animate(cardOpacity, 0, { duration: 0.3 });
      animate(cardY, 100, { duration: 0.3 });
    }
  }, [scrollPos, cardOpacity, cardY]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        opacity: opacitySpring,
        y: yPositionSpring,
      }}
      className="relative h-8 w-6 rounded-xl bg-gradient-to-br from-white to-black"
      onClick={() => window.open(link, "_blank")}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <img
          src={image}
          alt="Project"
          className="w-12 h-12 object-scale-down"
        />
      </div>
    </motion.div>
  );
};

export default TiltProjectsCard;

TiltProjectsCard.propTypes = {
  scrollPos: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
