import { Globe } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import styles from "./ChallengeAuthor.module.css";

export default function ChallengeAuthor({ author, authorImage }) {
  return (
    <div className={styles.card}>
      <img src={authorImage} alt={author} className={styles.avatar} />
      <div className={styles.info}>
        <h3 className={styles.name}>{author}</h3>
        <p className={styles.role}>Frontend Developer & UI Designer</p>
        <p className={styles.bio}>
          Crafting beautiful, accessible web experiences with a focus on
          clean code and thoughtful design.
        </p>
        <div className={styles.links}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub profile"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Portfolio website"
          >
            <Globe size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
