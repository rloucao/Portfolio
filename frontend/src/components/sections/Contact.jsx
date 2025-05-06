import { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/contact.css";
import { SiGithub, SiLinkedin } from "react-icons/si";
import emailjs from "emailjs-com";


const icons ={
  GitHub: <SiGithub />,
  LinkedIn: <SiLinkedin />,
}

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    emailjs.sendForm('service_20250506', 'template_20250506', e.target, 'user_20250506')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <div className="contact-content">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Send Message</button>
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
