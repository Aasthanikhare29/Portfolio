import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Code, Palette, Wrench, Lightbulb } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import {
  frontendSkills,
  designSkills,
  toolsSkills,
  softSkills,
} from "../../data/skills";
import styles from "./Skills.module.css";

const categories = [
  { icon: Code, title: "Frontend", skills: frontendSkills, color: styles.blue },
  { icon: Palette, title: "Design", skills: designSkills, color: styles.pink },
  { icon: Wrench, title: "Tools", skills: toolsSkills, color: styles.mint },
  { icon: Lightbulb, title: "Soft Skills", skills: softSkills, color: styles.lavender },
];

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>My Creative Toolkit</h2>
          <p className={styles.subtitle}>
            The technologies, tools and skills I use to bring ideas to life.
          </p>
        </AnimatedSection>

        <div className={styles.categories}>
          {categories.map((cat, index) => (
            <AnimatedSection key={cat.title} delay={index * 0.08}>
              <div className={styles.category}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon}>
                    <cat.icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                </div>
                <div className={styles.skillTags}>
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`${styles.skillTag} ${cat.color}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className={styles.viewAll}>
          <Link to="/skills" className={styles.viewAllLink}>
            View All Skills <FiArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
