import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import soshair from "../../assets/sos-hair.png";
import "../../styles/projects.css";

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

// Plays only while the card is on screen, so three autoplaying videos don't
// all decode at once. Falls back to the poster when motion is unwelcome.
const ProjectMedia = ({ title, image, video }) => {
  const videoRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (!video || prefersReducedMotion) {
    return <img src={image} alt={title} loading="lazy" />;
  }

  return (
    <video
      ref={videoRef}
      src={video}
      poster={image}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${title} preview`}
    />
  );
};

ProjectMedia.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string,
};

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    image,
    video,
    technologies,
    demo,
    github,
    clientReview,
    discontinued,
  } = project;

  const checkIfGitHub = (github) => {
    return github !== undefined && github !== "";
  };

  return (
    <div className={`project-card${discontinued ? " is-discontinued" : ""}`}>
      <div className="project-image">
        <ProjectMedia title={title} image={image} video={video} />
        {discontinued && <span className="project-status">Discontinued</span>}
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
          {discontinued ? (
            <span className="project-link-disabled">Site offline</span>
          ) : (
            <a href={demo} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
          {checkIfGitHub(github) && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>
        {/* {clientReview && (
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
            <p className="review-text">{clientReview}</p>
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
        )} */}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    video: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string,
    github: PropTypes.string,
    clientReview: PropTypes.string,
    discontinued: PropTypes.bool,
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
      video: PropTypes.string,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
      demo: PropTypes.string,
      github: PropTypes.string,
      clientReview: PropTypes.string,
      discontinued: PropTypes.bool,
    }),
  ).isRequired,
};

Projects.defaultProps = {
  projects: [
    {
      title: "Museu da Batata Doce",
      description:
        "A multilingual editorial website for a restaurant, 14-room hotel and rental houses on the Alentejo coast — their only digital point of contact. Features scroll-driven motion design built with GSAP and Lenis, a full four-language content system (PT/EN/DE/IT), per-property galleries with lightboxes, and reservation and event-quote forms delivered through Next.js Server Actions with spam protection.",
      image: "/videos/mbd.jpg",
      video: "/videos/mbd.mp4",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "GSAP",
        "Resend",
      ],
      demo: "https://museubatatadoce.com",
      clientReview:
        "We needed something that worked for a restaurant and a beach at the same time, and Rodrigo understood that immediately. Guests order from their sunbed without anyone walking back and forth, and the reservations and daily numbers are all in one place for us. He listened, delivered fast, and the site looks exactly like we imagined.",
    },
    {
      title: "Grão d' Areia",
      description:
        "A full-stack website and management system for a beachside restaurant. Features a public-facing site with menu display and reservation functionality, a sunbed ordering system allowing customers to place orders directly from the beach, and an admin dashboard for booking management, financial tracking, and operational control. Built with a focus on performance and a modern, responsive design.",
      image: "/videos/gda.jpg",
      video: "/videos/gda.mp4",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "PostgreSQL",
        "Tailwind CSS",
        "Recharts",
      ],
      demo: "https://graodareia.com",
      clientReview:
        "We needed something that worked for a restaurant and a beach at the same time, and Rodrigo understood that immediately. Guests order from their sunbed without anyone walking back and forth, and the reservations and daily numbers are all in one place for us. He listened, delivered fast, and the site looks exactly like we imagined.",
    },
    {
      title: "Barbearia 130",
      description:
        "A full-stack booking and management system for a barbershop. Features a high-performance public booking interface and a comprehensive admin dashboard for staff management, financial reporting, and real-time schedule control. Includes role-based access control (RBAC) and automated message notifications.",
      image: "/videos/b130.jpg",
      video: "/videos/b130.mp4",
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
        "Before, the bookings were on paper and half the day was spent on the phone. Now the clients book themselves, they get the reminder automatically, and I can see the schedule and the month's numbers from my phone. Rodrigo built it around how we actually work, not how he thought a barbershop works. Very easy to work with.",
    },

    {
      title: "SOS-Hair",
      description:
        "A website for a hair salon, providing a platform for customers to book appointments, view services, and make payments. And provide a dashboard for the admin to manage the appointments and services.",
      image: soshair,
      technologies: ["Next.js", "Tailwind CSS", "Supabase", "Stripe"],
      demo: "https://sos-hair.pt",
      discontinued: true,
    },
  ],
};

export default Projects;
