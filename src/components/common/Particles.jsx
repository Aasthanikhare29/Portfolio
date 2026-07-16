import { useCallback, useMemo } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SHAPES = ["circle", "diamond", "star", "cross"];
const COLORS = [
  "var(--pink)",
  "var(--lavender)",
  "var(--mint)",
  "var(--yellow)",
  "var(--blue)",
  "var(--peach)",
  "var(--coral)",
];

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Particles({ count = 30 }) {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = i * 7 + 3;
      return {
        id: i,
        x: seededRandom(seed) * 100,
        y: seededRandom(seed + 1) * 100,
        size: 4 + seededRandom(seed + 2) * 10,
        color: COLORS[i % COLORS.length],
        shape: SHAPES[i % SHAPES.length],
        duration: 15 + seededRandom(seed + 3) * 25,
        delay: seededRandom(seed + 4) * 10,
        opacity: 0.15 + seededRandom(seed + 5) * 0.25,
      };
    });
  }, [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius:
              p.shape === "circle"
                ? "50%"
                : p.shape === "diamond"
                ? "2px"
                : "50%",
            opacity: p.opacity,
            transform:
              p.shape === "diamond" ? "rotate(45deg)" : "none",
            animation: prefersReducedMotion
              ? "none"
              : `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          50% { transform: translateY(-8px) translateX(-8px) rotate(-3deg); }
          75% { transform: translateY(-25px) translateX(5px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}
