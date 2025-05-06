import PropTypes from "prop-types";
import "../../styles/skills.css";

const SkillCategory = ({ title, skills }) => {
  return (
    <div className="skill-category">
      <h3>{title}</h3>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span className="skill-name">{skill.name}</span>
            <div className="skill-bar">
              <div
                className="skill-level"
                style={{ width: `${skill.level}%` }}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SkillCategory.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const Skills = ({ skills }) => {
  return (
    <div className="skills-container">
      <h2>Skills</h2>
      <div className="skills-grid">
        <SkillCategory title="Frontend" skills={skills.frontend} />
        <SkillCategory title="Backend" skills={skills.backend} />
        <SkillCategory title="Tools & Others" skills={skills.tools} />
      </div>
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.shape({
    frontend: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
      })
    ).isRequired,
    backend: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
      })
    ).isRequired,
    tools: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

Skills.defaultProps = {
  skills: {
    frontend: [
      { name: "React", level: 60 },
      { name: "JavaScript", level: 70 },
      { name: "TypeScript", level: 65 },
      { name: "HTML5", level: 66 },
      { name: "CSS3", level: 50 },
      { name: "Tailwind CSS", level: 68 },
    ],
    backend: [
      { name: "Next.js", level: 70 },
      { name: "Java", level: 80 },
      { name: "Python", level: 75 },
      { name: "Kotlin", level: 60 },
      { name: "MongoDB", level: 75 },
      { name: "SQL", level: 70 },
      { name: "RESTful APIs", level: 85 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Figma", level: 40 },
    ],
  },
};

export default Skills;
