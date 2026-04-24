import { create } from 'zustand';
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  getUser: () => Promise<User | null>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    set({ user, loading: false });
    return user;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  setUser: (user) => set({ user }),
}));
