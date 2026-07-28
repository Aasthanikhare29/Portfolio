import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSend, FiMail, FiLinkedin, FiGithub, FiMapPin } from "react-icons/fi";
import { Sprout } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import { publicProfileService, publicSocialService, addActivity } from "../../admin/services/adminDataService";
import { contactApi } from "../../services/api";
import styles from "./Contact.module.css";

function useProfile() {
  const [, setVersion] = useState(0);
  const profile = publicProfileService.get();

  useEffect(() => {
    const handler = () => setVersion((v) => v + 1);
    window.addEventListener("storage", handler);
    window.addEventListener("profileUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("profileUpdated", handler);
    };
  }, []);

  return profile;
}

export default function Contact() {
  const profile = useProfile();
  const [socialLinks] = useState(() => publicSocialService.getAll());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setSubmitError("");
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      try {
        await contactApi.submit(formData);
        addActivity("Message received", `From ${formData.name} — "${formData.subject}"`);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (err) {
        console.error("Contact form submit error:", err);
        setSubmitError("Failed to send message. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (submitError) setSubmitError("");
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

              {submitError && (
                <div className={styles.errorMsg}>{submitError}</div>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitted || submitting}
              >
                <FiSend />{" "}
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className={styles.contactInfo}>
              {[
                {
                  icon: FiMail,
                  label: "Email",
                  value: profile.email || "aastha@example.com",
                  href: `mailto:${profile.email || "aastha@example.com"}`,
                },
                ...(socialLinks
                  .filter((s) => s.platform === "LinkedIn")
                  .map((s) => ({
                    icon: FiLinkedin,
                    label: "LinkedIn",
                    value: s.url.replace("https://", ""),
                    href: s.url,
                  }))),
                ...(socialLinks
                  .filter((s) => s.platform === "GitHub")
                  .map((s) => ({
                    icon: FiGithub,
                    label: "GitHub",
                    value: s.url.replace("https://", ""),
                    href: s.url,
                  }))),
                {
                  icon: FiMapPin,
                  label: "Location",
                  value: profile.location || "Nagpur, India",
                },
                {
                  icon: Sprout,
                  label: "Availability",
                  value:
                    profile.availabilityStatus ||
                    "Open to UI & Frontend opportunities",
                },
              ]
                .filter(Boolean)
                .map((card, i) => (
                  <div key={i} className={styles.infoCard}>
                    <span className={styles.infoIcon}>
                      <card.icon
                        size={card.icon === Sprout ? 20 : 18}
                        strokeWidth={card.icon === Sprout ? 1.5 : undefined}
                      />
                    </span>
                    <div>
                      <p className={styles.infoLabel}>{card.label}</p>
                      {card.href ? (
                        <a
                          href={card.href}
                          target={
                            card.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                          className={styles.infoLink}
                        >
                          {card.value}
                        </a>
                      ) : (
                        <span className={styles.infoValue}>{card.value}</span>
                      )}
                    </div>
                  </div>
                ))}

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