import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as authApi from '@/api/auth';

type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
} | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<{ token: string; user: NonNullable<User> }>;
  register: (data: { name: string; email: string; password: string }) => Promise<{ token: string; user: NonNullable<User> }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  });

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // Hydrate user from server if token exists but user is empty (page refresh)
  useEffect(() => {
    const hasToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (hasToken && !user) {
      authApi
        .getMe()
        .then((res) => setUser(res.user || null))
        .catch(() => {
          // invalid token
          setToken(null);
          setUser(null);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const res = await authApi.login(data);
    if (res?.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    const res = await authApi.register(data);
    if (res?.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  };

  const logout = () => {
    authApi.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
