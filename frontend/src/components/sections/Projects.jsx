import PropTypes from "prop-types";
import image from "../../assets/image.png";
import soshair from "../../assets/sos-hair.png";
import "../../styles/projects.css";
const ProjectCard = ({ project }) => {
  const { title, description, image, technologies, demo, github } = project;

  const checkIfGitHub = (github) => {
    return github !== undefined && github !== "";
  };

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tech">
          {technologies.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={demo} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
          {checkIfGitHub(github) && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string.isRequired,
    github: PropTypes.string,
  }).isRequired,
};

const Projects = ({ projects }) => {
  return (
    <div className="projects-container">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
      demo: PropTypes.string.isRequired,
      github: PropTypes.string,
    })
  ).isRequired,
};

Projects.defaultProps = {
  projects: [
    {
      title: "SOS-Hair",
      description:
        "A website for a hair salon, providing a platform for customers to book appointments, view services, and make payments. And provide a dashboard for the admin to manage the appointments and services.",
      image: soshair,
      technologies: ["Next.js", "Tailwind CSS", "Supabase", "Stripe"],
      demo: "https://sos-hair.pt",
    },
    
    {
      title: "Weather Dashboard",
      description:
        "A weather application that provides real-time weather data and forecasts using open weather API",
      image: image,
      technologies: ["Next.js", "OpenWeather API", "Tailwind CSS"],
      demo: "https://weather-app-seven-psi-87.vercel.app/",
      github: "https://github.com/rloucao/weather-app",
    },
  ],
};

export default Projects;
