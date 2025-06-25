import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  user: { email: string } | null;
  token: string | null;
  setAuth: (token: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<{ email: string } | null>(() => {
    const savedEmail = localStorage.getItem('userEmail');
    return savedEmail ? { email: savedEmail } : null;
  });

  const setAuth = (newToken: string, email: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userEmail', email);
    setToken(newToken);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
