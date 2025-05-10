import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthStatus } from '../types';
import { onAuthStateChange, loginWithEmail, logout, signUpWithEmail } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('idle');

  useEffect(() => {
    setStatus('loading');
    
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setStatus(user ? 'authenticated' : 'unauthenticated');
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setStatus('loading');
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      setStatus('unauthenticated');
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    setStatus('loading');
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      setStatus('unauthenticated');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    status,
    login,
    register,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};