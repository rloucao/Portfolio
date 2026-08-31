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
  SiDocker,
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
  Docker: <SiDocker color="#2496ED" />,
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
  "Docker",
];

const About = ({ techStack = DEFAULT_TECH_STACK }) => {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p className="about-text-first">
            Hi! I&apos;m Rodrigo Loução, a Computer Science master's student at
            NOVA FCT, specializing in Cloud Computing and Reliable Systems. I
            build things for the web, for mobile, and increasingly, for the
            infrastructure that holds it all together.
          </p>
          <br />
          <p>
            I didn't start with a plan. I started with curiosity. When I began
            my degree, I had never written a line of code, I just wanted to
            understand how things worked. That curiosity became a habit, and
            that habit became a craft. Since then, I've built websites for local
            businesses, developed a peer-to-peer messaging app from scratch, and
            explored everything from distributed systems to edge computing.s
            Since then, I&apos;ve been on a constant journey of learning and
            growth, always seeking challenges beyond the classroom and turning
            ideas into real-world solutions.
          </p>
          <br />
          <p>
           Outside of the screen, I train for Ironman triathlons, ride mountain trails. I believe the same mindset that gets you through a long ride gets you through a hard problem: patience, consistency, and the refusal to stop before it's done.
          </p>
        </div>
      </div>

      {/* <div className="tech-icons">
        {techStack.map((tech) =>
          techIcons[tech] ? (
            <span key={tech} className="tech-badge">
              <span className="tech-icon">{techIcons[tech]}</span>
              {tech}
            </span>
          ) : null
        )}
      </div> */}

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
