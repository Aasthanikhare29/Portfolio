import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Palette, Smartphone, Puzzle, ClipboardList, Globe, Bug, Coffee, BookOpen, Users } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import styles from "./ThingsILove.module.css";

const things = [
  { icon: Palette, text: "Designing colorful interfaces", color: "pink" },
  { icon: Smartphone, text: "Building responsive layouts", color: "blue", wide: true },
  { icon: Puzzle, text: "Learning new frontend techniques", color: "mint" },
  { icon: ClipboardList, text: "Organizing ideas in Figma", color: "lavender" },
  { icon: Globe, text: "Exploring beautiful websites", color: "blue" },
  { icon: Bug, text: "Solving UI bugs", color: "pink", wide: true },
  { icon: Coffee, text: "Coffee and creative playlists", color: "mint" },
  { icon: BookOpen, text: "Reading design articles", color: "lavender", wide: true },
  { icon: Users, text: "Collaborating with teams", color: "blue" },
];

export default function ThingsILove() {
  return (
    <section className={styles.things} id="things">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <p className={styles.eyebrow}>Personal</p>
          <h2 className={styles.title}>A Few Things That Make Me Happy</h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {things.map((thing, index) => (
            <AnimatedSection key={thing.text} delay={index * 0.06}>
              <div className={`${styles.card} ${styles[thing.color]} ${thing.wide ? styles.wide : ""}`}>
                <span className={styles.cardIcon}>
                  <thing.icon size={22} strokeWidth={1.5} />
                </span>
                <span className={styles.cardText}>{thing.text}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
