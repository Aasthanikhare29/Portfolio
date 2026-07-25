import { Code, Palette, Star, Monitor, Lightbulb, Wrench } from "lucide-react";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import {
  expertise,
  frontendSkills,
  designSkills,
  toolsSkills,
  softSkills,
} from "../data/skills";
import styles from "./SkillsPage.module.css";

const expertiseIconMap = {
  Palette: Palette,
  Code: Code,
  Sparkles: Star,
};

const accentMap = {
  pink: styles.expertiseCardPink,
  blue: styles.expertiseCardBlue,
  lavender: styles.expertiseCardLavender,
};

const techCategories = [
  {
    icon: <Code size={22} strokeWidth={1.5} />,
    title: "Frontend Development",
    items: frontendSkills,
    color: styles.techCardBlue,
    pillColor: styles.pillBlue,
  },
  {
    icon: <Palette size={22} strokeWidth={1.5} />,
    title: "Design Skills",
    items: designSkills,
    color: styles.techCardPink,
    pillColor: styles.pillPink,
  },
  {
    icon: <Wrench size={22} strokeWidth={1.5} />,
    title: "Development Tools",
    items: toolsSkills,
    color: styles.techCardMint,
    pillColor: styles.pillMint,
  },
  {
    icon: <Lightbulb size={22} strokeWidth={1.5} />,
    title: "Soft Skills",
    items: softSkills,
    color: styles.techCardLavender,
    pillColor: styles.pillLavender,
  },
];

export default function SkillsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="My Creative Toolkit"
        subtitle="The technologies, tools and skills I use to bring ideas to life — from design concepts to deployed products."
        icon={Monitor}
        variant="skills"
      />

      <div className={styles.content}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>What I Do Best</h2>
            <p className={styles.sectionSubtitle}>
              Three areas where I combine creativity with technical skills to
              deliver meaningful digital experiences.
            </p>
          </AnimatedSection>

          <div className={styles.expertiseGrid}>
            {expertise.map((item, index) => {
              const ExpertiseIcon = expertiseIconMap[item.icon] || Code;
              return (
                <AnimatedSection key={item.id} delay={index * 0.12}>
                  <div
                    className={`${styles.expertiseCard} ${
                      accentMap[item.accent] || accentMap.pink
                    }`}
                  >
                    <div className={styles.expertiseIcon}>
                      <ExpertiseIcon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.expertiseCardTitle}>{item.title}</h3>
                    <p className={styles.expertiseDesc}>{item.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.techSection}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
            <p className={styles.sectionSubtitle}>
              The full set of technologies, tools and skills I work with.
            </p>
          </AnimatedSection>

          <div className={styles.techGrid}>
            {techCategories.map((cat, index) => (
              <AnimatedSection key={cat.title} delay={index * 0.1}>
                <div className={`${styles.techCard} ${cat.color}`}>
                  <div className={styles.techCardHeader}>
                    <span className={styles.techCardIcon}>{cat.icon}</span>
                    <h3 className={styles.techCardTitle}>{cat.title}</h3>
                  </div>
                  <div className={styles.techItems}>
                    {cat.items.map((item) => (
                      <span key={item} className={`${styles.techItem} ${cat.pillColor}`}>{item}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
