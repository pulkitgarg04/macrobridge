import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set((state) => ({ user, isAuthenticated: !!user })),
  setToken: (token) => set((state) => ({ token, isAuthenticated: !!token })),
  login: (user, token) => set(() => ({ user, token, isAuthenticated: true })),
  logout: () => set(() => ({ user: null, token: null, isAuthenticated: false })),
})); 