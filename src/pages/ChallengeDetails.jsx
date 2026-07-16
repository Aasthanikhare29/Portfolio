import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight, Zap, Users, Trophy } from "lucide-react";
import { getChallengeBySlug, getRelatedChallenges, getAdjacentChallenges } from "../data/challenges";
import ScrollProgress from "../components/challenges/ScrollProgress";
import TableOfContents from "../components/challenges/TableOfContents";
import ShareButtons from "../components/challenges/ShareButtons";
import ChallengeAuthor from "../components/challenges/ChallengeAuthor";
import ChallengeTags from "../components/challenges/ChallengeTags";
import RelatedChallenges from "../components/challenges/RelatedChallenges";
import ChallengeComments from "../components/challenges/ChallengeComments";
import Newsletter from "../components/challenges/Newsletter";
import BackToTop from "../components/challenges/BackToTop";
import AnimatedSection from "../components/common/AnimatedSection";
import styles from "./ChallengeDetails.module.css";

const difficultyColors = {
  Easy: { bg: "var(--mint)", color: "#2d7a4f" },
  Medium: { bg: "var(--yellow)", color: "#8a6d00" },
  Hard: { bg: "var(--coral)", color: "#b33a3a" },
};

export default function ChallengeDetails() {
  const { slug } = useParams();
  const challenge = getChallengeBySlug(slug);

  const related = useMemo(
    () => (challenge ? getRelatedChallenges(challenge, 3) : []),
    [challenge]
  );

  const { prev, next } = useMemo(
    () => (slug ? getAdjacentChallenges(slug) : { prev: null, next: null }),
    [slug]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!challenge) return;
    document.title = `${challenge.title} | Narendra`;
  }, [challenge]);

  if (!challenge) {
    return (
      <div className={styles.notFound}>
        <h1>Challenge not found</h1>
        <Link to="/blog" className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
      </div>
    );
  }

  const diff = difficultyColors[challenge.difficulty] || difficultyColors.Medium;
  const formattedDate = new Date(challenge.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderContent = (content) => {
    const lines = content.split("\n");
    const elements = [];
    let inCodeBlock = false;
    let codeContent = "";

    lines.forEach((line, i) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className={styles.codeBlock}>
              <code>{codeContent.trim()}</code>
            </pre>
          );
          codeContent = "";
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        return;
      }

      const trimmed = line.trim();
      if (!trimmed) {
        elements.push(<div key={`space-${i}`} className={styles.spacer} />);
        return;
      }

      if (trimmed.startsWith("## ")) {
        const text = trimmed.slice(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2 key={i} id={id} className={styles.h2}>
            {text}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        const text = trimmed.slice(4);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h3 key={i} id={id} className={styles.h3}>
            {text}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        elements.push(
          <blockquote key={i} className={styles.blockquote}>
            <p>{trimmed.slice(2).replace(/"/g, "\u201C").replace(/"/g, "\u201D")}</p>
          </blockquote>
        );
      } else if (trimmed.startsWith("- ")) {
        elements.push(
          <li key={i} className={styles.listItem}>
            {renderInline(trimmed.slice(2))}
          </li>
        );
      } else if (/^\d+\./.test(trimmed)) {
        elements.push(
          <li key={i} className={styles.numberedItem}>
            {renderInline(trimmed.replace(/^\d+\.\s*/, ""))}
          </li>
        );
      } else {
        elements.push(
          <p key={i} className={styles.paragraph}>
            {renderInline(trimmed)}
          </p>
        );
      }
    });

    return elements;
  };

  const renderInline = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className={styles.inlineCode}>
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      <ScrollProgress />

      <article className={styles.article}>
        <header className={styles.hero}>
          <div className="container">
            <AnimatedSection>
              <Link to="/blog" className={styles.backToChallenges}>
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className={styles.heroBadges}>
                <span
                  className={styles.difficulty}
                  style={{ background: diff.bg, color: diff.color }}
                >
                  {challenge.difficulty}
                </span>
                <span className={styles.category}>{challenge.category}</span>
                <span className={styles.readingTime}>
                  <Clock size={13} />
                  {challenge.timeLimit}
                </span>
                <span className={styles.date}>
                  <Calendar size={13} />
                  {formattedDate}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className={styles.title}>{challenge.title}</h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className={styles.subtitle}>{challenge.subtitle}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <Zap size={16} />
                  <span>{challenge.points} Points</span>
                </div>
                <div className={styles.heroStat}>
                  <Users size={16} />
                  <span>{challenge.completions} Solved</span>
                </div>
                <div className={styles.heroStat}>
                  <Trophy size={16} />
                  <span>{challenge.difficulty}</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className={styles.heroImageWrap}>
            <div className="container">
              <AnimatedSection delay={0.4}>
                <img
                  src={challenge.coverImage}
                  alt={challenge.title}
                  className={styles.heroImage}
                />
              </AnimatedSection>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <div className="container">
            <div className={styles.layout}>
              <aside className={styles.sidebar}>
                <TableOfContents items={challenge.tableOfContents} />
              </aside>

              <div className={styles.main}>
                <AnimatedSection>
                  <div className={styles.content}>
                    {renderContent(challenge.content)}
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className={styles.shareSection}>
                    <span className={styles.shareLabel}>Share this post</span>
                    <ShareButtons
                      url={`https://yoursite.com/blog/${challenge.slug}`}
                      title={challenge.title}
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <ChallengeTags tags={challenge.tags} />
                </AnimatedSection>

                <AnimatedSection>
                  <ChallengeAuthor
                    author={challenge.author}
                    authorImage={challenge.authorImage}
                  />
                </AnimatedSection>

                {(prev || next) && (
                  <AnimatedSection>
                    <div className={styles.adjacent}>
                      {prev ? (
                        <Link
                          to={`/blog/${prev.slug}`}
                          className={styles.adjacentCard}
                        >
                          <ChevronLeft size={16} />
                          <div>
                            <span className={styles.adjacentLabel}>Previous</span>
                            <span className={styles.adjacentTitle}>{prev.title}</span>
                          </div>
                        </Link>
                      ) : (
                        <div />
                      )}
                      {next ? (
                        <Link
                          to={`/blog/${next.slug}`}
                          className={`${styles.adjacentCard} ${styles.adjacentNext}`}
                        >
                          <div>
                            <span className={styles.adjacentLabel}>Next</span>
                            <span className={styles.adjacentTitle}>{next.title}</span>
                          </div>
                          <ChevronRight size={16} />
                        </Link>
                      ) : (
                        <div />
                      )}
                    </div>
                  </AnimatedSection>
                )}

                <RelatedChallenges posts={related} />

                <AnimatedSection>
                  <ChallengeComments />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Newsletter />
      <BackToTop />
    </>
  );
}
