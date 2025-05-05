import Cup from "./components/cup";
import Name from "./components/name";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import "./App.css";
import image from "./assets/bonito.jpg";
import image2 from "./assets/bonito-praia.JPEG";
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
        </div>
        <div className="cup-container">
          <Cup />
        </div>
      </section>
     

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
  );
}

export default App;
