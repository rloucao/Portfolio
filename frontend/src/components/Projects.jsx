import PropTypes from "prop-types";

const ProjectCard = ({ project }) => {
  const { title, description, image, technologies, demo, github } = project;

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
          <a href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
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
    github: PropTypes.string.isRequired,
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
      github: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Projects.defaultProps = {
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
      image: "https://via.placeholder.com/400x250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      demo: "#",
      github: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team features.",
      image: "https://via.placeholder.com/400x250",
      technologies: ["React", "Firebase", "Material-UI", "Redux"],
      demo: "#",
      github: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "A weather application that provides real-time weather data and forecasts using multiple APIs.",
      image: "https://via.placeholder.com/400x250",
      technologies: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
      demo: "#",
      github: "#",
    },
  ],
};

export default Projects;
