import Cup from "./components/background/cup";
import Name from "./components/background/name";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
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

          <Name />

          <div className="image-container">
            <img src={image} alt="profile" className="image" />
            <img src={image2} alt="profile" className="image" />
          </div>
        {/* <Footprints /> */}

        </div>
        <div className="cup-container">
          <Cup />
        </div>
      </section>

      <div className="section-container">
        <section id="about" className="section">
          <About />
        </section>

        <section id="projects" className="section">
          <Projects />
        </section>

        <section id="skills" className="section">
          <Skills />
        </section>

        <section id="experience" className="section">
          <Experience />
        </section>

        <section id="contact" className="section">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
