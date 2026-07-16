import { Link2 } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import styles from "./ShareButtons.module.css";

export default function ShareButtons({ url, title, vertical = false }) {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || "");

  const links = [
    {
      icon: <FaLinkedinIn size={16} />,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      icon: <FaXTwitter size={16} />,
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      icon: <FaFacebookF size={16} />,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      icon: <FaWhatsapp size={16} />,
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      icon: <Link2 size={16} />,
      label: "Copy Link",
      onClick: () => navigator.clipboard?.writeText(window.location.href),
    },
  ];

  return (
    <div
      className={`${styles.wrapper} ${vertical ? styles.vertical : ""}`}
      role="group"
      aria-label="Share this article"
    >
      {links.map((link) =>
        link.onClick ? (
          <button
            key={link.label}
            className={styles.button}
            onClick={link.onClick}
            aria-label={link.label}
            title={link.label}
          >
            {link.icon}
          </button>
        ) : (
          <a
            key={link.label}
            href={link.href}
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            title={link.label}
          >
            {link.icon}
          </a>
        )
      )}
    </div>
  );
}
