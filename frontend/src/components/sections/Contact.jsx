import { useRef, useState } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Turnstile } from "@marsidev/react-turnstile";
import { useLanguage } from "../../i18n/useLanguage";
import { LINKS } from "../../content/projects";
import "../../styles/contact.css";

const EMPTY_FORM = { name: "", email: "", message: "" };

const Contact = () => {
  const { t } = useLanguage();
  const copy = t.contact;
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [captchaToken, setCaptchaToken] = useState(null);
  // Holds a key into the copy (e.g. "sent"), not the text itself, so the
  // message follows a language switch.
  const [status, setStatus] = useState({ key: "", type: "" });
  const [sending, setSending] = useState(false);
  const turnstileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus({ key: "verify", type: "error" });
      return;
    }

    setSending(true);
    setStatus({ key: "sending", type: "info" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token: captchaToken }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus({ key: "sent", type: "success" });
      setFormData(EMPTY_FORM);
    } catch {
      setStatus({ key: "failed", type: "error" });
    } finally {
      turnstileRef.current?.reset();
      setCaptchaToken(null);
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-lede">{copy.lede}</p>
          <dl className="contact-details">
            <div>
              <dt>{copy.emailLabel}</dt>
              <dd>
                <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
              </dd>
            </div>
            <div>
              <dt>{copy.locationLabel}</dt>
              <dd>{copy.location}</dd>
            </div>
            <div>
              <dt>{copy.elsewhere}</dt>
              <dd className="contact-socials">
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                  <SiGithub aria-hidden="true" /> GitHub
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  <SiLinkedin aria-hidden="true" /> LinkedIn
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">{copy.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={copy.namePh}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">{copy.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={copy.emailPh}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="message">{copy.message}</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder={copy.messagePh}
              required
            />
          </div>
          <div className="field">
            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              options={{ theme: "light" }}
              onSuccess={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
              onError={() => setCaptchaToken(null)}
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!captchaToken || sending}
            >
              {sending ? copy.sending : copy.send}
            </button>
            {status.key && (
              <p className={`form-status ${status.type}`} role="status">
                {copy[status.key]}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
