import { useState, useEffect } from "react";
import Cup from "./components/background/cup";
import Name from "./components/background/name";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import "./App.css";
import image2 from "./assets/bonito-praia.JPEG";

function App() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {/* Hero section */}
      <section className="hero-section">
        {/* Name container*/}
        <div className="image-container">
          <img src={image2} alt="profile" className="image" />
        </div>{" "}
        <div
          className={`n-container ${
            animationComplete ? "animation-complete" : ""
          }`}
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
      {/* Cup container */}
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
