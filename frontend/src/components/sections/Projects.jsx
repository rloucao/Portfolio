import PropTypes from "prop-types";
import image from "../../assets/image.png";
import soshair from "../../assets/sos-hair.png";
import b130 from "../../assets/b130.png";
import "../../styles/projects.css";
const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    image,
    technologies,
    demo,
    github,
    clienteReview,
  } = project;

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
        {clienteReview && (
          <div className="client-review">
            <svg
              className="review-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33 20C7.4 20 6 18.4 6 16.27c0-3.8 2.67-7.47 8-11l1.33 1.87C12.2 8.87 10.67 11 10.67 13.33c.44-.13.89-.2 1.33-.2 2 0 3.33 1.47 3.33 3.33C15.33 18.53 12.8 20 9.33 20zm13.34 0c-1.94 0-3.34-1.6-3.34-3.73 0-3.8 2.67-7.47 8-11l1.33 1.87c-3.13 1.73-4.66 3.86-4.66 6.19.44-.13.89-.2 1.33-.2 2 0 3.33 1.47 3.33 3.33C28.66 18.53 26.13 20 22.67 20z"
                fill="currentColor"
              />
            </svg>
            <p className="review-text">{clienteReview}</p>
            <svg
              className="review-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33 20C7.4 20 6 18.4 6 16.27c0-3.8 2.67-7.47 8-11l1.33 1.87C12.2 8.87 10.67 11 10.67 13.33c.44-.13.89-.2 1.33-.2 2 0 3.33 1.47 3.33 3.33C15.33 18.53 12.8 20 9.33 20zm13.34 0c-1.94 0-3.34-1.6-3.34-3.73 0-3.8 2.67-7.47 8-11l1.33 1.87c-3.13 1.73-4.66 3.86-4.66 6.19.44-.13.89-.2 1.33-.2 2 0 3.33 1.47 3.33 3.33C28.66 18.53 26.13 20 22.67 20z"
                fill="currentColor"
              />
            </svg>
            <span className="review-label">Client Review</span>
          </div>
        )}
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
    clienteReview: PropTypes.string,
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
      clienteReview: PropTypes.string,
    }),
  ).isRequired,
};

Projects.defaultProps = {
  projects: [
    {
      title: "Barbearia 130",
      description:
        "A full-stack booking and management system for a barbershop. Features a high-performance public booking interface and a comprehensive admin dashboard for staff management, financial reporting, and real-time schedule control. Includes role-based access control (RBAC) and automated message notifications.",
      image: b130, 
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Tailwind CSS",
        "Recharts",
      ],
      demo: "https://barbearia130.com",
      clientReview:
        "",
    },

    {
      title: "SOS-Hair",
      description:
        "A website for a hair salon, providing a platform for customers to book appointments, view services, and make payments. And provide a dashboard for the admin to manage the appointments and services.",
      image: soshair,
      technologies: ["Next.js", "Tailwind CSS", "Supabase", "Stripe"],
      demo: "https://sos-hair.pt",
      clienteReview:
        "Even though he's still at university, his professionalism and attention to detail completely exceeded my expectations.",
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
