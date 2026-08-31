import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "../../styles/contact.css";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Turnstile } from "@marsidev/react-turnstile";

const icons = {
  GitHub: <SiGithub color="#181717" />,
  LinkedIn: <SiLinkedin color="#0A66C2" />,
};

const SocialLink = ({ social }) => {
  const { name, url } = social;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {icons[name]}
      <span>{name}</span>
    </a>
  );
};

SocialLink.propTypes = {
  social: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

const Contact = ({ socialLinks, email, location }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [sending, setSending] = useState(false);
  const turnstileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setFormStatus({
        message: "Please complete the verification",
        type: "error",
      });
      return;
    }

    setSending(true);
    setFormStatus({ message: "Sending...", type: "info" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token: captchaToken }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setFormStatus({ message: "Message sent successfully!", type: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setFormStatus({
        message: err.message || "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      turnstileRef.current?.reset();
      setCaptchaToken(null);
      setSending(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <div className="contact-content">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Your message here..."
                required
              />
            </div>
            <div className="form-group recaptcha-container">
              <Turnstile
                ref={turnstileRef}
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                options={{ theme: "dark" }}
                onSuccess={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
              />
            </div>
            <button type="submit" disabled={!captchaToken || sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mobile-contact-info">
            <div className="social-links">
              <h3>Connect with me</h3>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <SocialLink key={index} social={social} />
                ))}
              </div>
            </div>
            <div className="email">
              <h3>Email</h3>
              <p>{email}</p>
            </div>
            <div className="location">
              <h3>Location</h3>
              <p>{location}</p>
            </div>
          </div>
        </div>

        <div className="desktop-contact-info">
          <div className="social-links">
            <h3>Connect with me</h3>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <SocialLink key={index} social={social} />
              ))}
            </div>
          </div>
          <div className="email">
            <h3>Email</h3>
            <p>{email}</p>
          </div>
          <div className="location">
            <h3>Location</h3>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

Contact.defaultProps = {
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/rloucao",
      icon: "fab fa-github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rodrigo-lou%C3%A7%C3%A3o-347666268/",
      icon: "fab fa-linkedin",
    },
  ],
  email: "rodrigoloucao570@gmail.com",
  location: "Lisbon, Portugal",
};

export default Contact;
