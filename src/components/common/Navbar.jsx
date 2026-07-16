import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import styles from "./Navbar.module.css";

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

const darkPages = ["/about", "/projects", "/skills", "/journey", "/contact", "/things-i-love", "/testimonials"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isDarkHero = darkPages.some(p => location.pathname === p || location.pathname.startsWith(p + "/"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navClass = [
    styles.navbar,
    scrolled ? styles.scrolled : "",
    !scrolled && isDarkHero ? styles.darkMode : "",
  ].filter(Boolean).join(" ");

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div className={styles.navInner}>
        <Link to="/" className={styles.logo} aria-label="Go to home">
          ✨ Aastha
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${
                location.pathname === link.path ? styles.navLinkActive : ""
              }`}
              aria-current={location.pathname === link.path ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            className={styles.resumeBtn}
            download
            aria-label="Download resume"
          >
            <FiDownload /> Resume
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  className={`${styles.mobileNavLink} ${
                    location.pathname === link.path ? styles.mobileNavLinkActive : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <a
              href="/resume.pdf"
              className={styles.mobileResumeBtn}
              download
              onClick={() => setIsOpen(false)}
              aria-label="Download resume"
            >
              <FiDownload /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
