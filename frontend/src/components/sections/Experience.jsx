import PropTypes from "prop-types";
import "../../styles/experience.css";

const TimelineItem = ({ experience }) => {
  const { title, company, date, description } = experience;

  return (
    <div className="timeline-item">
      <div className="timeline-content">
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className="timeline-date">{date}</p>
        <ul className="timeline-description">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TimelineItem.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const EducationItem = ({ education }) => {
  const { degree, institution, date } = education;

  return (
    <div className="education-item">
      <h4>{degree}</h4>
      <p>{institution}</p>
      <p className="education-date">{date}</p>
    </div>
  );
};

EducationItem.propTypes = {
  education: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

const Experience = ({ experience, education }) => {
  return (
    <div className="experience-container">
      <h2>Experience</h2>
      <div className="timeline">
        {experience.map((exp, index) => (
          <TimelineItem key={index} experience={exp} />
        ))}
      </div>
      <div className="education">
        <h3>Education</h3>
        {education.map((edu, index) => (
          <EducationItem key={index} education={edu} />
        ))}
      </div>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Experience.defaultProps = {
  experience: [
    {
      title: "Full Stack Developer",
      company: "Freelancer",
      date: "2025 - Present",
      description: [
        "I design and develop full-stack web applications using Next.js, Tailwind CSS, Supabase, and Stripe — delivering modern, scalable solutions tailored to each client's needs.",
      ],
    },
    {
      title: "Full stack developer",
      company: "Innova Junior Consulting",
      date: "2024 - 2025",
      description: [
        "Developed web applications with a team of 4 developers using Java, Spring Boot, and React",
      ],
    },
  ],
  education: [
    {degree: "Master in Computer Science",
      institution: "University of Science and Technology - NOVA FCT",
      date: "2025 - 2027",
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Science and Technology - NOVA FCT",
      date: "2021 - 2025",
    },
    
  ],
};

export default Experience;
