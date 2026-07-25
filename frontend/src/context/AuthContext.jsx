import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, getMeRequest } from "../services/authService.js";

const AuthContext = createContext(null);

/**
 * Provides auth state to the whole app. Token lives in localStorage (read
 * directly by services/api.js's request interceptor) - this context owns
 * the user object and the loading/booting state so routes can wait for
 * "do we have a valid session" before deciding to redirect.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setBooting(false);
      return;
    }

    getMeRequest()
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setBooting(false));
  }, []);

  const login = async (email, password) => {
    const res = await loginRequest(email, password);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (name, email, password, targetRole) => {
    const res = await registerRequest(name, email, password, targetRole);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, booting, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
