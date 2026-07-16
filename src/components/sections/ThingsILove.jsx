import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Palette, Smartphone, Puzzle, ClipboardList, Globe, Bug, Coffee, BookOpen, Users } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import styles from "./ThingsILove.module.css";

const things = [
  { icon: Palette, text: "Designing colorful interfaces" },
  { icon: Smartphone, text: "Building responsive layouts" },
  { icon: Puzzle, text: "Learning new frontend techniques" },
  { icon: ClipboardList, text: "Organizing ideas in Figma" },
  { icon: Globe, text: "Exploring beautiful websites" },
  { icon: Bug, text: "Solving UI bugs" },
  { icon: Coffee, text: "Coffee and creative playlists" },
  { icon: BookOpen, text: "Reading design articles" },
  { icon: Users, text: "Collaborating with teams" },
];

export default function ThingsILove() {
  return (
    <section className={styles.things} id="things">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>A Few Things That Make Me Happy</h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {things.map((thing, index) => (
            <AnimatedSection key={thing.text} delay={index * 0.06}>
              <div className={styles.card}>
                <span className={styles.cardIcon}>
                  <thing.icon size={22} strokeWidth={1.5} />
                </span>
                <span className={styles.cardText}>{thing.text}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className={styles.viewAll}>
          <Link to="/things-i-love" className={styles.viewAllLink}>
            See All Things I Love <FiArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
