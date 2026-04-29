import { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

const DUMMY_USERS = [
  { email: 'demo@WealthWise.ai', password: 'demo123', name: 'Dream Explorer' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('qr-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        localStorage.setItem('qr-user', JSON.stringify(data));
        return { ok: true };
      }
      return { ok: false, error: data.message };
    } catch (error) {
      return { ok: false, error: 'Network error. Is the server running?' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        return { ok: true };
      }
      return { ok: false, error: data.message };
    } catch (error) {
      return { ok: false, error: 'Network error. Is the server running?' };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/signout`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });
      setUser(null);
      localStorage.removeItem('qr-user');
    } catch (error) {
      console.error('Logout error', error);
      setUser(null);
      localStorage.removeItem('qr-user');
    }
  };

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('qr-user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
