import Cup from "./components/background/cup";
import Name from "./components/background/name";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import "./App.css";
import image from "./assets/bonito.jpg";
import image2 from "./assets/bonito-praia.JPEG";
// import Footprints from "./components/background/footprints";

function App() {
  return (
    <div className="app-container">
      <section className="hero-section">
        <div className="n-container">
          <button
            onClick={() => window.open("https://github.com/rloucao")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {" "}
            <Name />{" "}
          </button>

          <div className="image-container">
            <img src={image} alt="profile" className="image" />
            <img src={image2} alt="profile" className="image" />
          </div>
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
      </section>

      <div className="section-container">
        <div className="footprints-container">
          {/* <Footprints /> */}
        </div>

        <section id="about" className="section">
          <About />
        </section>

        <section id="projects" className="section">
          <div className="section-projects">
            <Projects />
          </div>
        </section>

        <section id="contact" className="section">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
