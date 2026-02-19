import { useState, useEffect, useRef } from "react";
import Cup from "./components/background/cup";
import Name from "./components/background/name";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import "./App.css";
import image2 from "./assets/bonito-praia.JPEG";

function App() {
  // phase: "animating-in" | "flying" | "fading" | "settled"
  const [phase, setPhase] = useState("animating-in");
  const [flyStyle, setFlyStyle] = useState({});
  const nameRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (targetRef.current && nameRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const nameRect = nameRef.current.getBoundingClientRect();

        const fromX = window.innerWidth / 2 - nameRect.width / 2;
        const fromY = window.innerHeight / 2 - nameRect.height / 2;

        const dx = targetRect.left - fromX;
        const dy = targetRect.top - fromY;

        // Fly to the exact target position
        setFlyStyle({
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`,
          transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
        });
        setPhase("flying");

        // Fade out right before the position switch so the snap is invisible
        const fadeTimer = setTimeout(() => {
          setPhase("fading");
          setFlyStyle((prev) => ({
            ...prev,
            opacity: 0,
            transition: "opacity 0.15s ease",
          }));
        }, 1500);

        // Switch to relative, then fade back in
        const settleTimer = setTimeout(() => {
          setPhase("settled");
          setFlyStyle({});
        }, 1700);

        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(settleTimer);
        };
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <section className="hero-section">
        <div className="image-container">
          <img src={image2} alt="profile" className="image" />
        </div>

        {/* Invisible placeholder — reserves the exact space in the layout */}
        <div className="name-placeholder" ref={targetRef} />

        {/* Name: fixed while animating, relative+in-flow once settled */}
        <div
          ref={nameRef}
          className={`n-container ${phase === "settled" ? "settled" : ""}`}
          style={phase !== "settled" ? flyStyle : {}}
        >
          <button
            onClick={() => window.open("https://github.com/rloucao")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Name />
          </button>
        </div>
      </section>

      <div className="section-container">
        <section id="about" className="section">
          <About />
        </section>
        <div className="divider"></div>

        <section id="projects" className="section">
          <Projects />
        </section>

        <div className="divider"></div>
        <section id="contact" className="section">
          <Contact />
        </section>
      </div>

      <div className="cup-container">
        <button
          onClick={() => window.open("https://buymeacoffee.com/rloucao")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Cup />
        </button>
      </div>
    </div>
  );
}

export default App;