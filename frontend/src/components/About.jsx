import PropTypes from "prop-types";

const About = ({ techStack }) => {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            I&apos;m a passionate Full Stack Developer with a strong focus on
            creating elegant and efficient solutions. With expertise in both
            frontend and backend technologies, I specialize in building
            responsive web applications that deliver exceptional user
            experiences.
          </p>
          <p>
            My journey in software development began with a curiosity for how
            things work, which evolved into a deep passion for creating
            meaningful digital experiences. I believe in writing clean,
            maintainable code and staying up-to-date with the latest industry
            trends and best practices.
          </p>
          <p>
            When I&apos;m not coding, you can find me exploring new
            technologies, contributing to open-source projects, or enjoying a
            good cup of coffee while brainstorming my next project.
          </p>
        </div>
        <div className="about-image">
          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <div className="tech-icons">
              {techStack.map((tech, index) => (
                <span key={index}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
};

About.defaultProps = {
  techStack: ["React", "Node.js", "TypeScript", "MongoDB", "Express", "Git"],
};

export default About;
