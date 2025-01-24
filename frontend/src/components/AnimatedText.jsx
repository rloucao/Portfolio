import React from 'react';

const AnimatedText = ({text, scrollPos, startPos, endPos, color}) => {
    const isVisible = scrollPos > startPos && scrollPos < endPos;

    const style = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        color: 'darkgray ',
        textShadow: color === "white" ? "2px 2px 4px rgba(0,0,0,0.5)" : "2px 2px 4px rgba(255,255,255,0.5)",
        marginBottom: '20px',
    }

    return (<h3 style={style}>{text}</h3>);
}

export default AnimatedText;