import { useEffect, useState } from "react";

import icon from "./assets/RL.png";
import AnimatedText from "./components/animated-text";
import video from "./assets/background.mp4";
import TiltProjectsCard from "./components/tilt-projects-card";
import ImageRLS1 from "./assets/resized_screenshot.png";
import ImageRLS2 from "./assets/Screenshot 2025-03-16 000614.png";
import ImageRL from "./assets/gatonix.png";
import ImageMeia from './assets/meia-dezembro-podio.png'
import ImageMeia2 from './assets/podio-meia-dezembro-sozinho.jpeg'
import Medalha from './assets/medalha-meia.jpeg'
import Medalha2 from './assets/medalha-FDE.jpeg'
import Running from './assets/correr-meia.jpeg'


function App() {
  const [scrollPos, setScrollPos] = useState(0);
  const [positionTop, setPositionTop] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);
  const [textColor] = useState("white");

  const isVisible = (scrollPos, startPos, endPos) => {
    return scrollPos > startPos && scrollPos < endPos;
  };

  const updateCenterPosition = () => {
    setPositionTop(window.innerHeight / 2);
    setPositionLeft(window.innerWidth / 2);
  };

  useEffect(() => {
    updateCenterPosition();

    window.addEventListener("resize", updateCenterPosition);

    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateCenterPosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let fontSizeName = Math.max(4 - scrollPos / 100, 1.5) + "rem";
  let fontSizeText = Math.max(1 - scrollPos / 100, 1.5) + "rem";
  let topPos = Math.max(positionTop - 60 - scrollPos * 3, 17);

  console.log(scrollPos);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "500vh",
      overflowY: "scroll",
      position: "relative",
      width: "100vw",
    },
    icon: {
      position: "fixed",
      top: "10px",
      left: "10px",
      width: "40px",
      height: "40px",
    },
    video: {
      position: "absolute",
      width: "100vw",
      height: "100vh",
      display: "flex",
      zIndex: "-1",
      top: "0",
      left: "0",
      objectFit: "cover",
    },
    introduction: {
      position: "fixed",
      top: `${positionTop - 40}px`,
      left: `${positionLeft - 470}px`,
      fontSize: fontSizeText,
      opacity: Math.max(0.5 - scrollPos / 100, 0),
      color: "black",
      fontFamily: "monospace",
    },
    fullDev: {
      position: "fixed",
      top: `${positionTop - 40}px`,
      fontSize: fontSizeText,
      left: `${positionLeft + 250}px`,
      opacity: Math.max(0.5 - scrollPos / 100, 0),
      color: "ivory",
      fontFamily: "monospace",
    },
    name: {
      position: "fixed",
      top: `${topPos}px`,
      left: `${positionLeft}px`,
      alignItems: "center",
      transform: "translate(-50%, -50%)",
      fontSize: fontSizeName,
      color: textColor,
      textShadow:
        textColor === "white"
          ? "2px 2px 4px rgba(0,0,0,0.5)"
          : "2px 2px 4px rgba(255,255,255,0.5)",
      fontFamily: "monospace",
      fontWeight: "bold",
      zIndex: 3,
    },
    aboutmeTag: {
      transition: "top 0.2s ease-out, left 0.2s ease-out",
      position: "fixed",
      top: `${Math.max(positionTop - scrollPos * 0.3, 150)}px`,
      left: `${positionLeft - 50}px`,
      fontSize: fontSizeText,
      color: textColor,
      textShadow:
        textColor === "white"
          ? "2px 2px 4px rgba(0,0,0,0.5)"
          : "2px 2px 4px rgba(255,255,255,0.5)",
      fontFamily: "monospace",
      fontWeight: "bold",
    },
    aboutmetext: {
      position: "fixed",
      top: `${Math.max(positionTop + 50 - scrollPos * 0.1, 150)}px`,
      transform: "translate(-50%, -50%)",
      fontSize: fontSizeText,
      color: textColor,
      textShadow:
        textColor === "white"
          ? "2px 2px 4px rgba(0,0,0,0.5)"
          : "2px 2px 4px rgba(255,255,255,0.5)",
      fontFamily: "monospace",
      textAlign: "justify",
      width: "500px",
      right: "0",
      transition: "opacity 0.5s ease",
    },
    aboutmeimg: {
      position: "fixed",
      top: `${Math.max(positionTop + 25 - scrollPos * 0.18, 150)}px`,
      left: "10%",
      borderRadius: "20%",
      opacity: isVisible(scrollPos, 550, 999) ? 1 : 0,
      transition: "opacity 0.5s ease",
      
    },
    passionsTag: {
      transition: "top 0.2s ease-out, left 0.2s ease-out",
      position: "fixed",
      top: `${Math.max(positionTop - scrollPos * 0.3, 150)}px`,
      left: `${positionLeft - 65}px`,
      fontSize: fontSizeText,
      color: textColor,
      textShadow:
        textColor === "white"
          ? "2px 2px 4px rgba(0,0,0,0.5)"
          : "2px 2px 4px rgba(255,255,255,0.5)",
      fontFamily: "monospace",
      fontWeight: "bold",
    },
    passionsText: {
      position: "fixed",
      top: `${Math.max(positionTop + 120 - scrollPos * 0.1, 150)}px`,
      transform: "translate(-50%, -50%)",
      fontSize: fontSizeText,
      color: textColor,
      textShadow:
        textColor === "white"
          ? "2px 2px 4px rgba(0,0,0,0.5)"
          : "2px 2px 4px rgba(255,255,255,0.5)",
      fontFamily: "monospace",
      textAlign: "justify",
      width: "500px",
      right: "0",
      transition: "opacity 0.5s ease",
    },
    passionsimg: {
      position: "fixed",
      top: `${Math.max(positionTop - scrollPos * 0.1, 150)}px`,
      left: "10%",
      borderRadius: "20%",
      opacity: isVisible(scrollPos, 1000, 2000) ? 1 : 0,
      transition: "opacity 0.5s ease",
      width: "300px",
    },
    projectstext: {
      transition: "top 0.2s ease-out, left 0.2s ease-out",
      position: "fixed",
      top: `${Math.max(positionTop + 60 - scrollPos * 0.1, 150)}px`,
      fontSize: fontSizeText,
      color: textColor,
      textShadow:
        textColor === "white"
          ? "2px 2px 4px rgba(0,0,0,0.5)"
          : "2px 2px 4px rgba(255,255,255,0.5)",
      fontFamily: "monospace",
    },

    tiltdiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "50px",
      marginTop: "4000px",
    },
  };
  return (
    <>
      <video src={video} autoPlay loop muted style={styles.video} />
      <div style={styles.container}>
        <h2 style={styles.introduction}>Hello! My name is</h2>
        <h1 style={styles.name}>Rodrigo Loução</h1>
        <h2 style={styles.fullDev}>I am a Full Stack Developer</h2>
        <img src={icon} alt="Rodrigo Loução" style={styles.icon} />
        <AnimatedText
          text="Welcome to my portfolio!"
          scrollPos={scrollPos}
          startPos={100}
          endPos={200}
          customStyle={{
            color: "#05377b",
            position: "fixed",
            top: `${positionTop}px`,
            fontSize: fontSizeText,
            opacity: Math.max(0.5 - scrollPos / 100, 0),
            fontFamily: "monospace",
          }}
        />
        {/* about me */}
        <div>
          <AnimatedText
            text="about me"
            scrollPos={scrollPos}
            startPos={250}
            endPos={999}
            customStyle={styles.aboutmeTag}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={ImageRL}
              alt="Rodrigo Loução"
              style={styles.aboutmeimg}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/rodrigo-lou%C3%A7%C3%A3o-347666268/",
                  "_blank"
                )
              }
            />

            <AnimatedText
              text={
                <>
                  I am a Computer Science & Engineering student at NOVA
                  University of Lisbon. I am passionate about technology and
                  innovation, and I am always looking for new challenges and
                  opportunities to grow.
                  <strong> Hope you enjoy my portfolio!</strong>
                </>
              }
              scrollPos={scrollPos}
              startPos={550}
              endPos={999}
              customStyle={styles.aboutmetext}
            />
          </div>
        </div>

        {/* passions */}
        <div>
          <img
            src={ImageMeia}
            alt="Rodrigo Loução"
            style={styles.passionsimg}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/rodrigo-lou%C3%A7%C3%A3o-347666268/",
                "_blank"
              )
            }
          />
          <AnimatedText
            text="my passions"
            scrollPos={scrollPos}
            startPos={1000}
            endPos={2000}
            customStyle={styles.passionsTag}
          />
          <AnimatedText
            text={
              <>
                Running, cycling, swimming—this is how I feel alive. Every step,
                every mile, every stroke is a way to push my limits and connect
                with what truly matters. Nature is my gym, the road my guide,
                and movement my motivation.
              </>
            }
            scrollPos={scrollPos}
            startPos={1000}
            endPos={2000}
            customStyle={styles.passionsText}
          />
        </div>

        <div style={styles.tiltdiv}>
          <AnimatedText
            text="projects"
            scrollPos={scrollPos}
            startPos={3000}
            endPos={4000}
            customStyle={styles.projectstext}
          />
          <TiltProjectsCard
            scrollPos={scrollPos}
            image={ImageRLS1}
            link={"https://rls-v.vercel.app/"}
          />
          <TiltProjectsCard
            scrollPos={scrollPos}
            image={ImageRLS2}
            link={"https://weather-app-seven-psi-87.vercel.app/"}
          />
        </div>
      </div>
    </>
  );
}

export default App;
