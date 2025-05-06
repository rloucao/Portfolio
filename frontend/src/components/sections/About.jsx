import PropTypes from "prop-types";
import { FaReact, FaNodeJs, FaGit, FaStrava } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiNextdotjs, SiSupabase, SiFlutter, SiDart, SiFirebase } from "react-icons/si";
import "../../styles/about.css";

const techIcons = {
  React: <FaReact color="#61dafb" />,
  "Node.js": <FaNodeJs color="#3c873a" />,
  TypeScript: <SiTypescript color="#007acc" />,
  MongoDB: <SiMongodb color="#47a248" />,
  "Next.js": <SiNextdotjs color="#000000" />,
  Supabase: <SiSupabase color="#000000" />,
  Flutter: <SiFlutter color="#000000" />,
  Dart: <SiDart color="#000000" />,
  FireBase: <SiFirebase color="#000000" />,
  Git: <FaGit color="#f34f29" />,
  Strava: <FaStrava color="#fc4c02" />,
};

const About = ({ techStack }) => {
  return (
    <div className="about-container">
      <h2>About Me</h2>

      <div className="about-content">
        <div className="about-text">
          <p>
            I&apos;m a CS major student with a passion for Full Stack
            Development. With expertise in both frontend and backend
            technologies, I build responsive web applications that deliver
            exceptional user experiences.
          </p>
          <br />
          <p>
            When I first applied for a CS degree, I had no knowledge about
            programming, but I had a curiosity for how things work, which
            evolved into a deep passion for creating meaningful digital
            experiences. And since then, I have been always looking for new
            challenges and opportunities to learn and grow, beyond those given
            in the University.
          </p>
          <br />
          <p>When I&apos;m not coding, you can find me:</p>
          <ul className="about-activities">
            <li>📚 Studying</li>
            <li>🏋️ In the gym</li>
            <li>🏃 Training for my next race</li>
            <li>🚵‍♂️ Riding my bike through the mountain trails</li>
          </ul>
        </div>
        <div className="about-image">
          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <div className="tech-icons">
              {techStack.map((tech, index) => (
                <span className="tech-badge" key={index}>
                  {techIcons[tech] && (
                    <span className="tech-icon">{techIcons[tech]}</span>
                  )}
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="strava-link">
        <a
          href="https://www.strava.com/athletes/142855329"
          target="_blank"
          rel="noopener noreferrer"
          className="strava-anchor"
        >
          <span className="strava-icon">{techIcons["Strava"]}</span>
          <span>Follow me on Strava</span>
        </a>
      </div>
    </div>
  );
};

About.propTypes = {
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
};

About.defaultProps = {
  techStack: ["React", "Node.js", "TypeScript", "Next.js", "Supabase", "Git", "Flutter", "Dart", "FireBase"],
};

export default About;
