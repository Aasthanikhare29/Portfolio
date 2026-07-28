import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiDownload, FiChevronDown } from "react-icons/fi";
import { Heart, Star, Layers, ChevronRight } from "lucide-react";
import logoSrc from "../../assets/images/logo1.png";
import styles from "./Navbar.module.css";

const primaryLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/blog", label: "Blog" },
  { path: "/journey", label: "Journey" },
  { path: "/contact", label: "Contact" },
];

const moreLinks = [
  { path: "/things-i-love", label: "Things I Love", icon: Heart, color: "var(--pink-deep)" },
  { path: "/testimonials", label: "Testimonials", icon: Star, color: "var(--yellow-deep)" },
  { path: "/components", label: "Components", icon: Layers, color: "var(--lavender-deep)" },
];

const darkPages = [
  "/about", "/projects", "/skills", "/blog", "/journey",
  "/contact", "/things-i-love", "/testimonials", "/components",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isDarkHero = darkPages.some(
    (p) => location.pathname === p || location.pathname.startsWith(p + "/")
  );

  const isMoreActive = moreLinks.some((l) => location.pathname === l.path);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navClass = [
    styles.navbar,
    isDarkHero ? styles.darkMode : "",
    scrolled ? styles.scrolled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div className={styles.navInner}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Go to home">
          <img src={logoSrc} alt="Aastha Nikhare" className={styles.logoImg} />
        </Link>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          {primaryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${
                location.pathname === link.path ? styles.navLinkActive : ""
              }`}
              aria-current={location.pathname === link.path ? "page" : undefined}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.span
                  className={styles.activeDot}
                  layoutId="navDot"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* More dropdown */}
          <div
            className={`${styles.dropdownWrapper} ${isMoreActive ? styles.dropdownWrapperActive : ""}`}
            ref={dropdownRef}
          >
            <button
              className={`${styles.navLink} ${styles.moreBtn} ${
                isMoreActive ? styles.navLinkActive : ""
              } ${dropdownOpen ? styles.moreBtnOpen : ""}`}
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              More
              <FiChevronDown
                size={13}
                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
              />
              {isMoreActive && !dropdownOpen && (
                <motion.span
                  className={styles.activeDot}
                  layoutId="navDot"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className={styles.dropdownInner}>
                    <p className={styles.dropdownLabel}>More pages</p>
                    {moreLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ""}`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span
                            className={styles.dropdownIcon}
                            style={{ "--icon-color": link.color }}
                          >
                            <Icon size={15} />
                          </span>
                          <span className={styles.dropdownItemLabel}>{link.label}</span>
                          <ChevronRight size={12} className={styles.dropdownArrow} />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resume button */}
          <a
            href="/resume.pdf"
            className={styles.resumeBtn}
            download
            aria-label="Download resume"
          >
            <FiDownload size={15} /> Resume
          </a>
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className={styles.mobileMenuInner}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {/* Primary links */}
              {primaryLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                >
                  <Link
                    to={link.path}
                    className={`${styles.mobileNavLink} ${
                      location.pathname === link.path ? styles.mobileNavLinkActive : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.mobileNavLabel}>{link.label}</span>
                  </Link>
                </motion.div>
              ))}

              {/* Divider + More links */}
              <motion.div
                className={styles.mobileDivider}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 + primaryLinks.length * 0.04 }}
              />

              {moreLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + (primaryLinks.length + i) * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className={`${styles.mobileNavLink} ${styles.mobileNavLinkMore} ${
                        isActive ? styles.mobileNavLinkActive : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span
                        className={styles.mobileMoreIcon}
                        style={{ "--icon-color": link.color }}
                      >
                        <Icon size={15} />
                      </span>
                      <span className={styles.mobileNavLabel}>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Resume */}
              <motion.a
                href="/resume.pdf"
                className={styles.mobileResumeBtn}
                download
                onClick={() => setIsOpen(false)}
                aria-label="Download resume"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 + (primaryLinks.length + moreLinks.length) * 0.04 }}
              >
                <FiDownload size={16} /> Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
