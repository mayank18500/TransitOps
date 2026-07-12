import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext(null);

export const DEMO_USERS = [
  {
    email: 'manager@transitops.com',
    password: 'password123',
    name: 'Sarah Jenkins',
    role: 'Fleet Manager',
  },
  {
    email: 'dispatcher@transitops.com',
    password: 'password123',
    name: 'Marcus Vance',
    role: 'Dispatcher',
  },
  {
    email: 'safety@transitops.com',
    password: 'password123',
    name: 'Elena Rostova',
    role: 'Safety Officer',
  },
  {
    email: 'analyst@transitops.com',
    password: 'password123',
    name: 'David Kross',
    role: 'Financial Analyst',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load session on startup
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // If we have a backend URL, we can verify session, otherwise restore from storage
          if (import.meta.env.VITE_API_URL) {
            const res = await api.get('/auth/me');
            setUser(res.data.user);
            setIsAuthenticated(true);
          } else {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Session restoration failed:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // If we are integrated with a backend API, send the POST request
      if (import.meta.env.VITE_API_URL) {
        const res = await api.post('/auth/login', { email, password });
        const { token, user: loggedUser } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setUser(loggedUser);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        // standalone client mock login
        const demoUser = DEMO_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (demoUser) {
          // Generate a fake JWT token structure
          const fakeToken = 'mock_jwt_token_' + btoa(JSON.stringify(demoUser));
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('user', JSON.stringify(demoUser));
          setUser(demoUser);
          setIsAuthenticated(true);
          return { success: true };
        } else {
          // Check if it's a recently registered mock user
          const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          const customUser = mockUsers.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );
          if (customUser) {
            const fakeToken = 'mock_jwt_token_' + btoa(JSON.stringify(customUser));
            localStorage.setItem('token', fakeToken);
            localStorage.setItem('user', JSON.stringify(customUser));
            setUser(customUser);
            setIsAuthenticated(true);
            return { success: true };
          }
          throw new Error('Invalid email or password');
        }
      }
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password, role) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_URL) {
        const res = await api.post('/auth/signup', { name, email, password, role });
        const { token, user: loggedUser } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setUser(loggedUser);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        // standalone client mock signup
        const existingDemo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const existingMock = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (existingDemo || existingMock) {
          throw new Error('Email is already registered');
        }
        
        const newUser = { name, email, password, role };
        mockUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
        
        const fakeToken = 'mock_jwt_token_' + btoa(JSON.stringify(newUser));
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Signup failed',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
