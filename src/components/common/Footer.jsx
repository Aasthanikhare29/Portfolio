import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiInstagram } from "react-icons/fi";
import { publicSocialService } from "../../admin/services/adminDataService";
import logoSrc from "../../assets/images/logo1.png";
import styles from "./Footer.module.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/blog", label: "Blog" },
  { path: "/journey", label: "Journey" },
  { path: "/contact", label: "Contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.main}>
            <div className={styles.brand}>
              <Link to="/" className={styles.logo}>
                <img src={logoSrc} alt="Aastha Nikhare" className={styles.logoImg} />
              </Link>
              <p className={styles.tagline}>
                Designed with curiosity, coded with care and decorated with a
                little bit of joy. 🌸
              </p>
              <div className={styles.socialLinks}>
                {publicSocialService.getAll().map((link) => {
                  const iconMap = { FiGithub, FiLinkedin, FiMail, FiInstagram };
                  const Icon = iconMap[link.icon] || FiMail;
                  return (
                    <a key={link.id || link.platform}
                      href={link.url}
                      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={link.platform}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className={styles.linksGroup}>
              <div className={styles.linksCol}>
                <h4 className={styles.colTitle}>Navigate</h4>
                {navLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={styles.navLink}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className={styles.linksCol}>
                <h4 className={styles.colTitle}>More</h4>
                {navLinks.slice(4).map((link) => (
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
              Back to top <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
