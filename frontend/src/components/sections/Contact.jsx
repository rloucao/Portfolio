import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "../../styles/contact.css";
import { SiGithub, SiLinkedin } from "react-icons/si";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [captchaValue, setCaptchaValue] = useState(null);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setFormStatus({
        message: "Please verify that you are not a robot",
        type: "error",
      });
      return;
    }

    setFormStatus({ message: "Sending...", type: "info" });

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const params = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      date: new Date().toLocaleDateString(),
      "g-recaptcha-response": captchaValue,
    };

    emailjs.sendForm(serviceId, templateId, params).then(
      (result) => {
        console.log(result.text);
        setFormStatus({
          message: "Message sent successfully!",
          type: "success",
        });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
        // Reset reCAPTCHA
        recaptchaRef.current.reset();
        setCaptchaValue(null);
      },
      (error) => {
        console.log(error.text);
        setFormStatus({
          message: "Failed to send message. Please try again.",
          type: "error",
        });
      }
    );
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
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>
            <button type="submit" disabled={!captchaValue}>
              Send Message
            </button>
          </form>
        </div>
        <div className="contact-info">
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
