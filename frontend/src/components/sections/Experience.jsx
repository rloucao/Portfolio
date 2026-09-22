import { useLanguage } from "../../i18n/useLanguage";
import "../../styles/experience.css";

const Experience = () => {
  const { t } = useLanguage();
  const { experience } = t;

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{experience.eyebrow}</p>
          <h2 className="section-title">{experience.title}</h2>
        </header>
        <div className="xp-grid">
          <div>
            <h3 className="label">{experience.workLabel}</h3>
            <ul className="xp-list">
              {experience.jobs.map((job) => (
                <li key={job.role + job.org}>
                  <span className="xp-period">{job.period}</span>
                  <div>
                    <p className="xp-role">{job.role}</p>
                    <p className="xp-org">{job.org}</p>
                    <p className="xp-text">{job.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label">{experience.eduLabel}</h3>
            <ul className="xp-list">
              {experience.education.map((edu) => (
                <li key={edu.degree}>
                  <span className="xp-period">{edu.period}</span>
                  <div>
                    <p className="xp-role">{edu.degree}</p>
                    <p className="xp-org">{edu.org}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
