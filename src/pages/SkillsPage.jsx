import { Code, Palette, Wrench, Lightbulb, Star, Monitor } from "lucide-react";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import {
  frontendSkills,
  designSkills,
  toolsSkills,
  softSkills,
  expertise,
} from "../data/skills";
import styles from "./SkillsPage.module.css";

const categories = [
  {
    icon: <Code size={22} strokeWidth={1.5} />,
    title: "Frontend Development",
    desc: "The core technologies I use to build responsive, interactive web experiences.",
    skills: frontendSkills,
    color: styles.blue,
  },
  {
    icon: <Palette size={22} strokeWidth={1.5} />,
    title: "Design Skills",
    desc: "My design toolkit for creating thoughtful, user-centered interfaces.",
    skills: designSkills,
    color: styles.pink,
  },
  {
    icon: <Wrench size={22} strokeWidth={1.5} />,
    title: "Development Tools",
    desc: "The tools and platforms that power my development workflow.",
    skills: toolsSkills,
    color: styles.mint,
  },
  {
    icon: <Lightbulb size={22} strokeWidth={1.5} />,
    title: "Soft Skills",
    desc: "The interpersonal and cognitive abilities that complement my technical work.",
    skills: softSkills,
    color: styles.lavender,
  },
];

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

const tagColors = [styles.pink, styles.blue, styles.lavender, styles.mint, styles.peach, styles.yellow];

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
          <div className={styles.categories}>
            {categories.map((cat, index) => (
              <AnimatedSection key={cat.title} delay={index * 0.08}>
                <div className={styles.category}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryIcon}>{cat.icon}</span>
                    <div>
                      <h3 className={styles.categoryTitle}>{cat.title}</h3>
                      <p className={styles.categoryDesc}>{cat.desc}</p>
                    </div>
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
        </div>
      </div>

      <div className={styles.expertise}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.expertiseTitle}>
              <Star size={28} strokeWidth={1.5} /> What I Do Best
            </h2>
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
                    <div className={styles.expertiseIcon}><ExpertiseIcon size={28} strokeWidth={1.5} /></div>
                    <h3 className={styles.expertiseCardTitle}>{item.title}</h3>
                    <p className={styles.expertiseDesc}>{item.description}</p>
                    <div className={styles.expertiseSkills}>
                      {item.skills.map((skill, i) => (
                        <span
                          key={skill}
                          className={`${styles.expertiseSkillTag} ${
                            tagColors[i % tagColors.length]
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className={styles.toolsLabel}>Tools I use →</p>
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
      </div>
    </div>
  );
}
