import React, { useEffect, useState } from 'react'

import icon from './assets/RL.png'
import AnimatedText from './components/AnimatedText'
import video from './assets/background.mp4';
import NavBar from './components/NavBar';
import './styles/NavBar.css'


function App() {
  const [scrollPos, setScrollPos] = useState(0)
  const [positionTop, setPositionTop] = useState(0)
  const [positionLeft, setPositionLeft] = useState(0)
  const [textColor, setTextColor] = useState('white')


  const updateCenterPosition = () => {
    setPositionTop((window.innerHeight / 2))
    setPositionLeft((window.innerWidth  / 2))
  }

  useEffect(() => {
    updateCenterPosition();

    window.addEventListener('resize', updateCenterPosition);

    const handleScroll = () => {
      setScrollPos(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', updateCenterPosition)
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);


  let fontSizeName = Math.max(4 - scrollPos /100 , 1.5) + 'rem';
  let fontSizeText = Math.max(1 - scrollPos /100 , 1.5) + 'rem';
  let topPos = Math.max(positionTop - 60 - scrollPos * 3, 17);


  const styles = {
    introduction: {
      position: 'fixed',
      transition: 'top 0.2s ease-out, left 0.2s ease-out',
      top: `${positionTop - 40}px`,
      left: `${positionLeft - 450}px`,
      fontSize: fontSizeText,
      opacity: Math.max(0.3 - scrollPos / 100, 0),
      color: 'black',
    },
    fullDev: {
      position: 'fixed',
      transition: 'top 0.2s ease-out, left 0.2s ease-out',
      top: `${positionTop - 40}px`,
      fontSize: fontSizeText,
      left: `${positionLeft + 240}px`,
      opacity: Math.max(0.3 - scrollPos / 100, 0),
      color: 'ivory',
    },
    name:{
      transition: 'top 0.2s ease-out, left 0.2s ease-out',
      position: 'fixed',
      top: `${topPos}px`,
      left: `${positionLeft}px`,
      alignItems: 'center',
      transform: 'translate(-50%, -50%)',
      fontSize: fontSizeName,
      color: textColor,
      textShadow: textColor === "white" ? "2px 2px 4px rgba(0,0,0,0.5)" : "2px 2px 4px rgba(255,255,255,0.5)",
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '300vh',
      overflowY: 'scroll',
      position: 'relative',
      
    },
    pageContent: {
      width: '800px',
      padding: '20px',
      textAlign: 'center',
      
    },
    icon: {
      position: 'fixed',
      top: '10px',
      left: '10px',
      width: '40px',
      height: '40px',
    },
    text: {
      transition: "top 0.2s ease-out, left 0.2s ease-out",
      position: "fixed",
      top: `${Math.max(positionTop + 100 - scrollPos * 0.5, 300)}px`,
      left: `${positionLeft}px`,
      alignItems: "center",
      transform: "translate(-50%, -50%)",
      fontSize: fontSizeText,
      color: textColor,
      textShadow: textColor === "white" ? "2px 2px 4px rgba(0,0,0,0.5)" : "2px 2px 4px rgba(255,255,255,0.5)",
    },
    video: {
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      zIndex: '-1',
      top: '0',
      left: '0',
      objectFit: 'cover',
    },
  };
  return (
    <>
     <video src={video} autoPlay loop muted style={styles.video} />
     <NavBar TopPos={positionTop}/>
     <div style={styles.container}>
      <div style={styles.pageContent}>
        <h2 style={styles.introduction}>Hello! My name is</h2>
        <h1 style={styles.name}>Rodrigo Loução</h1>
        <h2 style={styles.fullDev}>I am a Full Stack Developer</h2>
        <img src={icon} alt='Rodrigo Loução' style={styles.icon}/>
        <div style={styles.text}>
          <AnimatedText text='Welcome to my portfolio!' scrollPos={scrollPos} startPos={75} endPos={900} />
        </div>
        </div>
      </div>
    </>
   
      
     
  )
}



export default App;
