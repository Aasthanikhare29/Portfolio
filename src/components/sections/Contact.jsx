import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSend, FiMail, FiLinkedin, FiGithub, FiMapPin, FiArrowRight } from "react-icons/fi";
import { Sprout } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Please enter a valid email";
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>Let's Create Something Meaningful</h2>
          <p className={styles.subtitle}>
            Have a project, opportunity or interesting idea? I'd love to hear
            about it.
          </p>
        </AnimatedSection>

        <div className={styles.grid}>
          <AnimatedSection>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  className={`${styles.input} ${
                    errors.subject ? styles.inputError : ""
                  }`}
                  type="text"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <span className={styles.errorText}>{errors.subject}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className={`${styles.textarea} ${
                    errors.message ? styles.textareaError : ""
                  }`}
                  value={formData.message}
                  onChange={handleChange("message")}
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <span className={styles.errorText}>{errors.message}</span>
                )}
              </div>

              {submitted && (
                <div className={styles.successMsg}>
                  Thank you! Your message has been sent. I'll get back to you
                  soon!
                </div>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitted}
              >
                <FiSend /> Send Message
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>
                  <FiMail />
                </span>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <a
                    href="mailto:aastha@example.com"
                    className={styles.infoLink}
                  >
                    aastha@example.com
                  </a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>
                  <FiLinkedin />
                </span>
                <div>
                  <p className={styles.infoLabel}>LinkedIn</p>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoLink}
                  >
                    linkedin.com/in/aastha
                  </a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>
                  <FiGithub />
                </span>
                <div>
                  <p className={styles.infoLabel}>GitHub</p>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoLink}
                  >
                    github.com/aastha
                  </a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>
                  <FiMapPin />
                </span>
                <div>
                  <p className={styles.infoLabel}>Location</p>
                  <span className={styles.infoValue}>Nagpur, India</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><Sprout size={20} strokeWidth={1.5} /></span>
                <div>
                  <p className={styles.infoLabel}>Availability</p>
                  <span className={styles.infoValue}>
                    Open to UI & Frontend opportunities
                  </span>
                </div>
              </div>

              <div className={styles.cta}>
                Let's turn your idea into something people enjoy using
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
