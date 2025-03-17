import PropTypes from "prop-types";

const AnimatedText = ({text, scrollPos, startPos, endPos, customStyle}) => {
    const isVisible = scrollPos > startPos && scrollPos < endPos;

    const defaultStyle = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        color: 'cadetblue  ',
        marginBottom: '20px',
    }

    const style = {...defaultStyle, ...customStyle};

    return (<h3 style={style}>{text}</h3>);
}

export default AnimatedText;

AnimatedText.propTypes = {
    text: PropTypes.string.isRequired,
    scrollPos: PropTypes.number.isRequired,
    startPos: PropTypes.number.isRequired,
    endPos: PropTypes.number.isRequired,
    customStyle: PropTypes.object,
};

