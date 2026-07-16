import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import styles from "./Footer.module.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/blog", label: "Blog" },
  { path: "/journey", label: "Journey" },
  { path: "/contact", label: "Contact" },
  { path: "/components", label: "UI Kit" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <Link to="/" className={styles.logo}>
                ✨ Aastha Nikhare
              </Link>
              <p className={styles.tagline}>
                Designed with curiosity, coded with care and decorated with a
                little bit of joy. 🌸
              </p>
            </div>

            <div className={styles.navSection}>
              <h4 className={styles.navTitle}>Navigation</h4>
              <div className={styles.navGrid}>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={styles.navLink}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.socialSection}>
              <h4 className={styles.navTitle}>Connect</h4>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={18} />
                </a>
                <a
                  href="mailto:aastha@example.com"
                  className={styles.socialLink}
                  aria-label="Email"
                >
                  <FiMail size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © 2026 Aastha Nikhare. All rights reserved.
            </p>
            <button
              className={styles.backToTop}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <FiArrowUp size={16} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
