import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuth({ user, token });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.register(name, email, password);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuth({ user, token });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ user: null, token: null });
  };

  return {
    user: auth.user,
    token: auth.token,
    login,
    register,
    logout,
  };
};

export default useAuth;