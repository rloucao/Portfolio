import React, { useState, useEffect, useRef} from "react"
import ColorThief from 'color-thief-browser'

const Slideshow = ({ images, interval = 500, onColorChange}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const imageRefs = useRef([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  useEffect(() => {
    const colorThief = new ColorThief()
    const img = imageRefs.current[currentSlide]

    if( img && img.complete){
        const dominatColor = colorThief.getColor(img)
        const brightness = (dominatColor[0] * 299 + dominatColor[1] * 587 + dominatColor[2] * 114) / 1000
        const textColor = brightness > 125 ? 'black' : 'white'
        onColorChange(textColor)
    }
}, [currentSlide, onColorChange])

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div
          key={index}
          className="slide"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentSlide ? 1 : 0,
          }}
        />
      ))}
      <style jsx>{`
                .slideshow {
                    position: fixed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: -1;
                }
                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: opacity 1s ease-in-out;
                    object-fit: contain;
                    max-width: 100%;
                    max-height: 100%;
                }
            `}</style>
    </div>
  )
}

export default Slideshow;

