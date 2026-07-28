import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, LogIn, Lock, Mail } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email format";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--admin-bg)", padding: "1rem",
      backgroundImage: `
        radial-gradient(ellipse 60% 50% at 20% 30%, rgba(237,228,255,0.5) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 80% 70%, rgba(255,228,239,0.4) 0%, transparent 55%)
      `,
    }}>
      <div style={{
        width: "100%", maxWidth: "400px",
        background: "var(--admin-card-bg)", borderRadius: "var(--radius-lg)",
        border: "1px solid var(--admin-border)", boxShadow: "var(--shadow-lg)",
        padding: "2.5rem 2rem",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "var(--radius-md)",
            background: "var(--lavender-deep)", display: "inline-flex",
            alignItems: "center", justifyContent: "center", marginBottom: "1rem",
          }}>
            <LogIn size={24} color="white" />
          </div>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700,
            color: "var(--admin-text)", marginBottom: "0.25rem",
          }}>Admin Login</h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div style={{
            padding: "0.75rem 1rem", background: "var(--color-error-light)",
            border: "1px solid var(--color-error)", borderRadius: "var(--radius-sm)",
            color: "var(--color-error)", fontSize: "0.8125rem", marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span>✕</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="login-email">Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{
                position: "absolute", left: "0.75rem", top: "50%",
                transform: "translateY(-50%)", color: "var(--admin-text-secondary)",
                pointerEvents: "none",
              }} />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); setError(""); }}
                placeholder="admin@example.com"
                className={`admin-input ${errors.email ? "error" : ""}`}
                style={{ paddingLeft: "2.25rem" }}
                autoComplete="email"
                autoFocus
              />
            </div>
            {errors.email && <span className="admin-error-text">{errors.email}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="login-password">Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{
                position: "absolute", left: "0.75rem", top: "50%",
                transform: "translateY(-50%)", color: "var(--admin-text-secondary)",
                pointerEvents: "none",
              }} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: "" })); setError(""); }}
                placeholder="Enter your password"
                className={`admin-input ${errors.password ? "error" : ""}`}
                style={{ paddingLeft: "2.25rem", paddingRight: "2.25rem" }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "0.625rem", top: "50%",
                  transform: "translateY(-50%)", background: "none", border: "none",
                  cursor: "pointer", color: "var(--admin-text-secondary)", padding: "4px",
                  display: "flex",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="admin-error-text">{errors.password}</span>}
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "1.25rem",
          }}>
            <label style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              cursor: "pointer", fontSize: "0.8125rem", color: "var(--admin-text-secondary)",
            }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                style={{ accentColor: "var(--lavender-deep)" }}
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={loading}
            style={{ width: "100%", padding: "0.75rem", fontSize: "0.875rem" }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="admin-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Signing in...
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <LogIn size={16} /> Sign In
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
