import { useState } from "react";
import { MessageCircle, Reply } from "lucide-react";
import styles from "./ChallengeComments.module.css";

const sampleComments = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    date: "2 days ago",
    text: "Great challenge! I solved it using a closure-based approach. The key insight was tracking the timeout ID properly.",
  },
  {
    id: 2,
    name: "Sarah Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    date: "5 days ago",
    text: "This took me a while but I finally got it. The test cases really help verify edge cases.",
  },
];

export default function ChallengeComments() {
  const [comments] = useState(sampleComments);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <MessageCircle size={20} />
        <h2 className={styles.heading}>Discussion</h2>
        <span className={styles.count}>{comments.length}</span>
      </div>

      <div className={styles.list}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <img
              src={comment.avatar}
              alt={comment.name}
              className={styles.avatar}
            />
            <div className={styles.body}>
              <div className={styles.meta}>
                <span className={styles.name}>{comment.name}</span>
                <span className={styles.date}>{comment.date}</span>
              </div>
              <p className={styles.text}>{comment.text}</p>
              <button className={styles.reply} aria-label={`Reply to ${comment.name}`}>
                <Reply size={14} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.addComment}>
        <div className={styles.addHeader}>
          <span className={styles.addLabel}>Share your approach</span>
        </div>
        <div className={styles.form}>
          <div className={styles.inputRow}>
            <input
              type="text"
              className={styles.nameInput}
              placeholder="Your name"
              aria-label="Your name"
            />
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Describe your solution approach..."
            rows={4}
            aria-label="Your comment"
          />
          <button className={styles.submit} aria-label="Post comment">
            Post Comment
          </button>
        </div>
      </div>
    </section>
  );
}
