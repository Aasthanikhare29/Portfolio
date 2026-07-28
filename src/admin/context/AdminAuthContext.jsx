import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi } from "../../services/api";

const AUTH_KEY = "portfolio_admin_auth";
const TOKEN_KEY = "portfolio_admin_token";
const USER_KEY = "portfolio_admin_user";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      const { token, user: userData } = response;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedInAt: new Date().toISOString() }));
      setUser(userData);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password. Please try again.";
      return { success: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
