import { useState, useMemo, useRef } from "react";
import challenges, { categories, getFeaturedChallenge } from "../data/challenges";
import ChallengeHero from "../components/challenges/ChallengeHero";
import FeaturedChallenge from "../components/challenges/FeaturedChallenge";
import ChallengeSearch from "../components/challenges/ChallengeSearch";
import ChallengeCategories from "../components/challenges/ChallengeCategories";
import ChallengeCard from "../components/challenges/ChallengeCard";
import EmptyState from "../components/challenges/EmptyState";
import Pagination from "../components/challenges/Pagination";
import Newsletter from "../components/challenges/Newsletter";
import AnimatedSection from "../components/common/AnimatedSection";
import styles from "./Challenges.module.css";

const POSTS_PER_PAGE = 6;

export default function Challenges() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const latestRef = useRef(null);

  const featured = getFeaturedChallenge();

  const filtered = useMemo(() => {
    return challenges.filter((c) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      const matchesCategory =
        activeCategory === "All" || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const scrollToChallenges = () => {
    latestRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <ChallengeHero onScrollToChallenges={scrollToChallenges} />

      <FeaturedChallenge challenge={featured} />

      <section className={styles.content} ref={latestRef}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.searchSection}>
              <ChallengeSearch value={search} onChange={handleSearchChange} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className={styles.categoriesSection}>
              <ChallengeCategories
                categories={categories}
                activeCategory={activeCategory}
                onSelect={handleCategoryChange}
              />
            </div>
          </AnimatedSection>

          {paginated.length > 0 ? (
            <>
              <div className={styles.grid}>
                {paginated.map((challenge, index) => (
                  <AnimatedSection key={challenge.id} delay={index * 0.08}>
                    <ChallengeCard challenge={challenge} index={index} />
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.1}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </AnimatedSection>
            </>
          ) : (
            <EmptyState message="No posts match your search. Try different keywords or browse all categories." />
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
