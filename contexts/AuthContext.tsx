import React, { createContext, useContext, useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

interface User {
  id: number;
  email: string;
  name: string;
  at: string;
}

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  user: User | null; // null if not logged in
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loginUrl = "http://192.168.1.88:3333/api/v1/login";

console.log("Using login URL:", loginUrl);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const promises = [
      SecureStore.getItemAsync(AUTH_TOKEN_KEY),
      SecureStore.getItemAsync(AUTH_USER_KEY),
    ];
    Promise.all(promises).then(([storedToken, storedUser]) => {
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    await fetch(loginUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        if (data.token) {
          setToken(data.token.token);
        }
        if (data.user) {
          setUser(data.user);
        }
      });
    if (!token || !user) {
      throw new Error("Login failed, no token / user received");
    }
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(user));
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_USER_KEY);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
