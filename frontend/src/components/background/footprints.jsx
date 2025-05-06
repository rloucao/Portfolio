import { useEffect, useState } from "react";
import "../../styles/footprints.css";
import PropTypes from "prop-types";

const steps = [
  { type: "left", left: 40, top: 600, rotation: -10 },
  { type: "right", left: 80, top: 520, rotation: 10 },
  { type: "left", left: 40, top: 440, rotation: -10 },
  { type: "right", left: 80, top: 360, rotation: 10 },
  { type: "left", left: 40, top: 280, rotation: -10 },
  { type: "right", left: 80, top: 200, rotation: 10 },
  { type: "left", left: 40, top: 120, rotation: -10 },
  { type: "right", left: 80, top: 40, rotation: 10 },
];

const Footprints = () => {
  const [visibleSteps, setVisibleSteps] = useState([0, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps(([a, b]) => {
        let nextA = b;
        let nextB = (a + 1) % steps.length;
        return [nextA, nextB];
      });
    }, 500); // Adjust speed here
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="footprints-container">
      {visibleSteps.map((stepIdx, i) => {
        const step = steps[stepIdx];
        const isFading = i === 0; // The older footprint fades out
        const Foot = step.type === "left" ? LeftFoot : RightFoot;
        return (
          <Foot
            key={stepIdx}
            style={{
              left: step.left,
              top: step.top,
              transform: `rotate(${step.rotation}deg)`,
              opacity: isFading ? 0.3 : 1,
              transition: "opacity 0.3s, left 0.3s, top 0.3s",
              position: "absolute",
            }}
          />
        );
      })}
    </div>
  );
};

// Reuse your existing JSX for left and right feet:
const LeftFoot = ({ style }) => (
  <div className="footprints-left" style={style}>
    <div className="footprints-toes-left">
      <span className="toe big"></span>
      <span className="toe second"></span>
      <span className="toe middle"></span>
      <span className="toe fourth"></span>
      <span className="toe little"></span>
      
    </div>
    <div className="footprints-insole-left">
      <span className="footprints-insole-left-row-span"></span>
    </div>
  </div>
);

const RightFoot = ({ style }) => (
  <div className="footprints-right" style={style}>
    <div className="footprints-toes">
      <span className="toe big"></span>
      <span className="toe second"></span>
      <span className="toe middle"></span>
      <span className="toe fourth"></span>
      <span className="toe little"></span>
    </div>
    <div className="footprints-insole-right">
      <span className="footprints-insole-right-row-span"></span>
    </div>
  </div>
);

LeftFoot.propTypes = {
  style: PropTypes.object,
};

RightFoot.propTypes = {
  style: PropTypes.object,
};

export default Footprints;
