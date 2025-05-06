import PropTypes from "prop-types";

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
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      date: "2021 - Present",
      description: [
        "Led a team of 5 developers in building a large-scale e-commerce platform",
        "Implemented modern React patterns and best practices",
        "Reduced page load time by 40% through performance optimization",
        "Mentored junior developers and conducted code reviews",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations",
      date: "2019 - 2021",
      description: [
        "Developed and maintained multiple web applications using MERN stack",
        "Implemented RESTful APIs and integrated third-party services",
        "Collaborated with UX/UI designers to create responsive interfaces",
        "Participated in agile development processes",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      date: "2015 - 2019",
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Code Academy",
      date: "2018",
    },
  ],
};

export default Experience;
