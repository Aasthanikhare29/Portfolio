import AnimatedSection from "../common/AnimatedSection";
import { expertise } from "../../data/skills";
import { Palette, Code, Sparkles } from "lucide-react";
import styles from "./Expertise.module.css";

const iconMap = {
  Palette: Palette,
  Code: Code,
  Sparkles: Sparkles,
};

const accentMap = {
  pink: { card: styles.cardPink, tag: styles.tagPink },
  blue: { card: styles.cardBlue, tag: styles.tagBlue },
  lavender: { card: styles.cardLavender, tag: styles.tagLavender },
};

const tagColors = [styles.tagPink, styles.tagBlue, styles.tagLavender, styles.tagMint, styles.tagPeach, styles.tagYellow];

export default function Expertise() {
  return (
    <section className={styles.expertise} id="expertise">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>What I Do Best</h2>
          <p className={styles.subtitle}>
            Three areas where I combine creativity with technical skills to
            deliver meaningful digital experiences.
          </p>
        </AnimatedSection>

        <div className={styles.grid}>
          {expertise.map((item, index) => {
            const accent = accentMap[item.accent] || accentMap.pink;
            const IconComponent = iconMap[item.icon] || Palette;
            return (
              <AnimatedSection key={item.id} delay={index * 0.12}>
                <div className={`${styles.card} ${accent.card}`}>
                  <div className={styles.cardIcon}>
                    <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>

                  <p className={styles.skillsLabel}>Core Skills</p>
                  <div className={styles.skillsList}>
                    {item.skills.map((skill, i) => (
                      <span
                        key={skill}
                        className={`${styles.skillTag} ${tagColors[i % tagColors.length]}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className={styles.toolsLabel}>Tools I use</p>
                  <div className={styles.toolsList}>
                    {item.tools.map((tool) => (
                      <span key={tool} className={styles.toolTag}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
