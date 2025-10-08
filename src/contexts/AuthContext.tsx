// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type User = { name: string } | null;

type AuthContextType = {
  user: User;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const login = () => setUser({ name: 'Mateus' });
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// Mock para teste sem Firebase
export const mockAuth = {
  onAuthStateChanged: (callback: (user: User) => void) => {
    const user = null;
    callback(user);
    return () => {};
  },
};
