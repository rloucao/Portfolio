import { useEffect, useState } from "react";

import icon from "./assets/RL.png";
import AnimatedText from "./components/AnimatedText";
import video from "./assets/background.mp4";
import TiltProjectsCard from "./components/TiltProjectsCard";
import ImageRLS1 from "./assets/resized_screenshot.png";
import ImageRLS2 from "./assets/Screenshot 2025-03-16 000614.png";
import ImageRL from "./assets/gatonix.png";

function App() {
  const [scrollPos, setScrollPos] = useState(0);
  const [positionTop, setPositionTop] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);
  const [textColor] = useState("white");

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
      height: "300vh",
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
    aboutmeContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "50px",
    },
    aboutmeTag: {
      position: "fixed",
      top: `${positionTop}px`,
      left: "50%",
      fontSize: fontSizeText,
      color: "#05377b",
      textShadow:
        textColor === "white"
          ? "2px 2px 4px rgba(0,0,0,0.5)"
          : "2px 2px 4px rgba(255,255,255,0.5)",
      fontFamily: "monospace",
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
      top: `${Math.max(positionTop + 500 - scrollPos * 0.1, 150)}px`,
      left: "10%",
      borderRadius: "20%",
      opacity: Math.max(1 - scrollPos / 100, 0),
      transition: "opacity 0.5s ease",
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
      marginTop: "1000px",
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

        <div style={styles.aboutmeContainer}>
          <AnimatedText
            text="about me"
            scrollPos={scrollPos}
            startPos={99}
            endPos={199}
            customStyle={styles.aboutmeTag}
          />
          <img src={ImageRL} alt="Rodrigo Loução" style={styles.aboutmeimg} />

          <AnimatedText
            text={
              <>
                I am a Computer Science & Engineering student at NOVA University
                of Lisbon. I am passionate about technology and innovation, and
                I am always looking for new challenges and opportunities to
                grow.
                <strong> Hope you enjoy my portfolio!</strong>
              </>
            }
            scrollPos={scrollPos}
            startPos={300}
            endPos={899}
            customStyle={styles.aboutmetext}
          />
        </div>

        <div style={styles.tiltdiv}>
          <AnimatedText
            text="Projects"
            scrollPos={scrollPos}
            startPos={299}
            endPos={499}
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
