import { useState } from "react";
import { Mail, Send, Sparkles } from "lucide-react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.decor}>
            <div className={styles.doodle}>✦</div>
            <div className={`${styles.doodle} ${styles.d2}`}>✿</div>
            <div className={`${styles.doodle} ${styles.d3}`}>♡</div>
          </div>
          <div className={styles.inner}>
            <div className={styles.iconWrap}>
              <Mail size={24} />
            </div>
            <p className={styles.label}>Subscribe to my newsletter</p>
            <h2 className={styles.title}>Never Miss a Challenge</h2>
            <p className={styles.subtitle}>
              Get notified when I publish new challenges about frontend
              development, algorithms, and system design.
            </p>
            {subscribed ? (
              <div className={styles.success}>
                <Sparkles size={18} />
                Thanks for subscribing! Check your inbox soon.
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputWrap}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                </div>
                <button
                  type="submit"
                  className={styles.button}
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={16} />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
