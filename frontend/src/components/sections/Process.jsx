import { useLanguage } from "../../i18n/useLanguage";
import "../../styles/process.css";

const Process = () => {
  const { t } = useLanguage();
  const { process } = t;

  return (
    <section id="process" className="section process">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="section-title">{process.title}</h2>
          <p className="section-lede">{process.lede}</p>
        </header>
        <ol className="steps">
          {process.steps.map((step, i) => (
            <li key={step.title}>
              <span className="step-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
