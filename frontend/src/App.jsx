import React, { useEffect, useState } from 'react'

import icon from './assets/RL.png'
import AnimatedText from './components/AnimatedText'
import Slideshow from './components/Slideshow'
import programming1 from "./assets/programming1.jpg"
import programming2 from "./assets/programming2.jpg"
import programming3 from "./assets/programming3.png"
import meiadescobrimentos from "./assets/meiadescobrimentos.png"
import fimDeEuropa from "./assets/33-corrida-fim-da-europa.jpg"
import meiaCascais from "./assets/meiaCascais.png"



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

  const fontSizeName = Math.max(4 - scrollPos /100 , 1.5) + 'rem';
  const fontSizeText = Math.max(1 - scrollPos /100 , 1.5) + 'rem';

  const styles = {
    name:{
      transition: 'top 0.2s ease-out, left 0.2s ease-out',
      position: 'fixed',
      top: `${Math.max(positionTop - scrollPos * 5.5, 30)}px`,
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
  };

  const imagesP = [
    programming1,programming2,programming3
  ]
  const imagesR = [
    meiadescobrimentos,fimDeEuropa,meiaCascais
  ]
  return (
    <div style={styles.container}>
      <Slideshow images={(scrollPos < 799 ) ? imagesP: imagesR} interval={5000} onColorChange={setTextColor} />
      <div style={styles.pageContent}>
        <h1 style={styles.name}>Rodrigo Loução</h1>
        <img src={icon} alt='Rodrigo Loução' style={styles.icon}/>
        <div style={styles.text}>
          <AnimatedText text='Welcome to my portfolio!' scrollPos={scrollPos} startPos={75} endPos={500} color={textColor}/>
          <AnimatedText text='I am a Full Stack developer' scrollPos={scrollPos} startPos={499} endPos={800} color={textColor}/>
          <AnimatedText text='And' scrollPos={scrollPos} startPos={799} endPos={1100} color={textColor} />
          <AnimatedText text='A passionate Runner' scrollPos={scrollPos} startPos={1099} endPos={9000} color={textColor}/>
        </div>
       
        </div>
      </div>
     
  )
}



export default App;
