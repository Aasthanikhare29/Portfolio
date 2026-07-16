import { Link } from "react-router-dom";
import { Palette, Smartphone, Puzzle, ClipboardList, Globe, Bug, Coffee, BookOpen, Users } from "lucide-react";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import styles from "./ThingsILovePage.module.css";

const things = [
  { icon: Palette, text: "Designing colorful interfaces", desc: "I find joy in crafting vibrant, user-friendly UIs that feel alive." },
  { icon: Smartphone, text: "Building responsive layouts", desc: "There's something satisfying about making designs work on every screen." },
  { icon: Puzzle, text: "Learning new frontend techniques", desc: "Always exploring fresh approaches and tools to level up my craft." },
  { icon: ClipboardList, text: "Organizing ideas in Figma", desc: "Turning scattered ideas into structured, visual plans is my happy place." },
  { icon: Globe, text: "Exploring beautiful websites", desc: "I love stumbling upon well-crafted sites that inspire my next project." },
  { icon: Bug, text: "Solving UI bugs", desc: "Debugging pixel-perfect issues is oddly therapeutic once solved." },
  { icon: Coffee, text: "Coffee and creative playlists", desc: "The perfect duo for long design and coding sessions." },
  { icon: BookOpen, text: "Reading design articles", desc: "Staying updated with trends and insights fuels my creativity." },
  { icon: Users, text: "Collaborating with teams", desc: "Great products come from great teamwork and shared vision." },
];

const colorPairs = [
  [styles.cardPink, styles.iconPink],
  [styles.cardPeach, styles.iconPeach],
  [styles.cardMint, styles.iconMint],
  [styles.cardLavender, styles.iconLavender],
  [styles.cardBlue, styles.iconBlue],
  [styles.cardYellow, styles.iconYellow],
  [styles.cardPink, styles.iconPink],
  [styles.cardMint, styles.iconMint],
  [styles.cardLavender, styles.iconLavender],
];

export default function ThingsILovePage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="A Few Things That Make Me Happy"
        subtitle="Beyond the screen, these are the things that keep me inspired, curious, and motivated every day."
        variant="things"
      />

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {things.map((thing, index) => (
              <AnimatedSection key={thing.text} delay={index * 0.06}>
                <div className={`${styles.card} ${colorPairs[index][0]}`}>
                  <span className={`${styles.cardIcon} ${colorPairs[index][1]}`}><thing.icon size={24} strokeWidth={1.5} /></span>
                  <h3 className={styles.cardTitle}>{thing.text}</h3>
                  <p className={styles.cardDesc}>{thing.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <AnimatedSection className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Want to connect?</h2>
            <p className={styles.ctaText}>
              I'd love to hear about what makes you happy too. Let's chat!
            </p>
            <Link to="/contact" className={styles.ctaBtn}>
              Get In Touch →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
