import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Code, Palette, Wrench, Lightbulb } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import { publicSkillService } from "../../admin/services/adminDataService";
import styles from "./Skills.module.css";

const skillGroups = publicSkillService.getGrouped();
const iconMap = { Frontend: Code, Design: Palette, "UI/UX": Palette, Tools: Wrench, "Soft Skills": Lightbulb, Other: Code };
const colorMap = { Frontend: styles.blue, Design: styles.pink, "UI/UX": styles.pink, Tools: styles.mint, "Soft Skills": styles.lavender, Other: styles.blue };

const categories = Object.entries(skillGroups).map(([title, skills]) => ({
  icon: iconMap[title] || Code, title, skills, color: colorMap[title] || styles.blue,
}));

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
