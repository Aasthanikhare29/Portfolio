import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: { bg: "#E0F7EB", border: "#8DD8AD", text: "#276749", icon: "#2f855a" },
  error: { bg: "#FFE4EF", border: "#F0A9C9", text: "#9b2c2c", icon: "#c53030" },
  warning: { bg: "#FFF5CC", border: "#F0E07A", text: "#975a16", icon: "#b7791f" },
  info: { bg: "#E3EEFF", border: "#A6C4F0", text: "#2a4365", icon: "#2b6cb0" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: "fixed", top: "1rem", right: "1rem", zIndex: 10000,
        display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "380px"
      }}>
        {toasts.map(toast => {
          const Icon = icons[toast.type];
          const c = colors[toast.type];
          return (
            <div key={toast.id} style={{
              background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: "12px",
              padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)", animation: "slideInRight 0.3s ease"
            }}>
              <Icon size={18} color={c.icon} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: "0.875rem", color: c.text, fontWeight: 500 }}>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "2px", color: c.text, opacity: 0.6
              }} aria-label="Dismiss">
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
