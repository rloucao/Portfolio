import React from "react"

const AnimatedTextNav= ({ text, progress }) => {
  const style = {
    opacity: progress,
    transform: `translateY(${20 - progress * 20}px)`,
    transition: "opacity 0.5s ease, transform 0.5s ease",
    color: "cadetblue",
    marginBottom: "20px",
  }

  return <h3 style={style}>{text}</h3>
}

export default AnimatedTextNav;

