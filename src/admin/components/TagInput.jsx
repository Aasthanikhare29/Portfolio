import { useState, useRef } from "react";
import { X, Plus } from "lucide-react";

export default function TagInput({ tags = [], onChange, placeholder = "Add item...", label }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const addTag = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInput("");
    inputRef.current?.focus();
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addTag(); }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="admin-form-group">
      {label && <label className="admin-form-label">{label}</label>}
      <div style={{
        border: "1.5px solid var(--admin-border)", borderRadius: "var(--radius-sm)",
        padding: "0.375rem 0.5rem", display: "flex", flexWrap: "wrap", gap: "0.375rem",
        alignItems: "center", background: "var(--admin-card-bg)", transition: "var(--transition-fast)",
      }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--lavender-deep)"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--admin-border)"}
      >
        {tags.map((tag, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: "0.25rem",
            padding: "0.125rem 0.5rem 0.125rem 0.625rem",
            background: "var(--lavender)", borderRadius: "999px",
            fontSize: "0.75rem", fontWeight: 500, color: "#553c9a",
          }}>
            {tag}
            <button onClick={() => removeTag(i)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "1px",
              display: "flex", color: "#553c9a", opacity: 0.6,
            }} aria-label={`Remove ${tag}`}>
              <X size={12} />
            </button>
          </span>
        ))}
        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: "120px" }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ""}
            style={{
              border: "none", outline: "none", flex: 1, fontSize: "0.8125rem",
              padding: "0.25rem 0.375rem", background: "transparent",
              fontFamily: "var(--font-body)", color: "var(--admin-text)",
              minWidth: "60px",
            }}
          />
          {input.trim() && (
            <button onClick={addTag} style={{
              background: "none", border: "none", cursor: "pointer", padding: "4px",
              color: "var(--lavender-deep)", display: "flex",
            }} aria-label="Add">
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
