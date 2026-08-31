import { useState, useLayoutEffect, useRef } from "react";
import Cup from "./components/background/cup";
import Name from "./components/background/name";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import "./App.css";
import image2 from "./assets/bonito-praia.JPEG";

function App() {
  const [settled, setSettled] = useState(false);
  const nameRef = useRef(null);

  // FLIP: the name lives in normal document flow the whole time, so it never
  // follows the scroll. A transform parks it at screen centre; transitioning
  // that transform back to zero slides it into the spot it already occupies —
  // no position switch at the end, so there is no snap to hide with a fade.
  useLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    let released = false;
    const timers = [];

    const parkAtCentre = () => {
      if (released) return;
      el.style.transition = "none";
      el.style.transform = "none";

      // Centre the visible text, not the container. .n-container is flex:1 and
      // far wider than the name, which sits at its left edge — centring the box
      // would leave the text off to one side.
      const visual = el.querySelector(".name-wrapper") || el;
      const flow = visual.getBoundingClientRect();
      const dx = window.innerWidth / 2 - (flow.left + flow.width / 2);
      const dy = window.innerHeight / 2 - (flow.top + flow.height / 2);

      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const slideHome = () => {
      released = true;
      el.style.transition = "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "none";
      // transitionend is the normal path; this guarantees the lifted z-index
      // is dropped even if the transition never runs (reduced motion, etc).
      timers.push(setTimeout(() => setSettled(true), 1600));
    };

    // Runs before paint, so the name is never seen in its final spot first.
    parkAtCentre();

    timers.push(setTimeout(slideHome, 3000));
    const onTransitionEnd = (e) => {
      if (e.propertyName === "transform") setSettled(true);
    };

    el.addEventListener("transitionend", onTransitionEnd);
    window.addEventListener("resize", parkAtCentre);

    return () => {
      timers.forEach(clearTimeout);
      el.removeEventListener("transitionend", onTransitionEnd);
      window.removeEventListener("resize", parkAtCentre);
    };
  }, []);

  return (
    <div className={`app-container${settled ? "" : " is-locked"}`}>
      <section className="hero-section">
        <div className="image-container">
          <img src={image2} alt="profile" className="image" />
        </div>

        {/* Name: always in flow; a transform parks it at centre until it slides */}
        <div
          ref={nameRef}
          className={`n-container${settled ? " settled" : ""}`}
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