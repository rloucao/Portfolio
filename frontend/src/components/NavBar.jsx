import React, { useState, useEffect } from "react"
import AnimatedText from "./AnimatedTextNav"

const NavBar = ({ TopPos }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition >= TopPos) {
        setIsVisible(true)
        setProgress(Math.min((scrollPosition - TopPos) / 200, 1))
      } else {
        setIsVisible(false)
        setProgress(0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [TopPos])

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : ""}`}>
      <div className="navbar-content" style={{ width: `${progress * 100}%` }}>
        <AnimatedText text="Home" progress={progress} />
        <AnimatedText text="About" progress={progress} />
        <AnimatedText text="Services" progress={progress} />
        <AnimatedText text="Contact" progress={progress} />
      </div>
    </nav>
  )
}

export default NavBar

