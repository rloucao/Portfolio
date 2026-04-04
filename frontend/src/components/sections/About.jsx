import PropTypes from "prop-types";
import { FaReact, FaNodeJs, FaGit, FaStrava } from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiNextdotjs,
  SiSupabase,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiKubernetes,
  SiDocker

} from "react-icons/si";
import "../../styles/about.css";

const techIcons = {
  React: <FaReact color="#61dafb" />,
  "Node.js": <FaNodeJs color="#3c873a" />,
  TypeScript: <SiTypescript color="#007acc" />,
  MongoDB: <SiMongodb color="#47a248" />,
  "Next.js": <SiNextdotjs color="#000000" />,
  Supabase: <SiSupabase color="#3ECF8E" />,
  Flutter: <SiFlutter color="#02569B" />,
  Dart: <SiDart color="#0175C2" />,
  FireBase: <SiFirebase color="#FF8F6B" />,
  Git: <FaGit color="#f34f29" />,
  Strava: <FaStrava color="#fc4c02" />,
  Kubernetes: <SiKubernetes color="#326CE5" />,
  Docker: <SiDocker color="#2496ED" />

};

const DEFAULT_TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Supabase",
  "Flutter",
  "Dart",
  "FireBase",
  "Git",
  "Kubernetes",
  "Docker"
];

const About = ({ techStack = DEFAULT_TECH_STACK }) => {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p className="about-text-first">
            Hi, I&apos;m a Computer Science major with a passion for Full Stack
            Development. I specialize in building responsive, user-centric web
            applications using a wide range of frontend and backend
            technologies.
          </p>
          <br />
          <p>
            When I started my degree, I knew nothing about programming, I just
            had a strong curiosity for how things work. That curiosity soon
            turned into a drive to create meaningful digital experiences. Since
            then, I&apos;ve been on a constant journey of learning and growth,
            always seeking challenges beyond the classroom and turning ideas
            into real-world solutions.
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
      </div>

      <div className="tech-icons">
        {techStack.map((tech) =>
          techIcons[tech] ? (
            <span key={tech} className="tech-badge">
              <span className="tech-icon">{techIcons[tech]}</span>
              {tech}
            </span>
          ) : null
        )}
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
  techStack: PropTypes.arrayOf(PropTypes.string),
};


export default About;
