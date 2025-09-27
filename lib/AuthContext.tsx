"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

type User = { id: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/auth/me");
      
      
      setUser(res.data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
  try {
    const res = await axios.post("/api/auth/login", { email, password });

    if (res.status === 200) {
setUser(res.data.user || null);
      await refreshUser(); 
    }
  } catch (err: any) {
    const message = err.response?.data?.error || err.message || "Login failed";
    throw new Error(message);
  }
};


  const register = async (email: string, password: string) => {
    try{
const res = await axios.post("/api/auth/register", { email, password });
    console.log(res.data);
    
   if (res.status < 200 || res.status >= 300) {
    throw new Error(res.data.error || "Registration failed");
  }
    }catch(err:any){
      throw new Error(err.response?.data?.error|| "Registration failed")
    }
    
  };

  
  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
