import LanguageProvider from "./i18n/LanguageProvider";
import useSmoothScroll from "./hooks/useSmoothScroll";
import Nav from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Experience from "./components/sections/Experience";
import About from "./components/sections/About";
import Process from "./components/sections/Process";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

function App() {
  useSmoothScroll();

  return (
    <LanguageProvider>
      <Nav />
      {/* Opaque and above the footer, so the footer is revealed from behind. */}
      <main className="page">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
