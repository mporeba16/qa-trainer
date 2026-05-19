import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, supabaseEnabled } from '../lib/supabase';

type AuthState = {
  user: User | null;
  loading: boolean; // true podczas pierwszego getSession()
  enabled: boolean; // czy Supabase jest skonfigurowany
};

// Trzyma sesje uzytkownika z Supabase. Reaguje na auth state changes
// (magic link → automatyczna detekcja URL hash po redirecie z emaila).
export function useAuth(): AuthState & {
  signInWithMagicLink: (email: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(supabaseEnabled);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Pierwsza weryfikacja sesji (czyta z localStorage Supabase lub URL hash po redirect)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subskrypcja na zmiany (login, logout, refresh token)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithMagicLink = async (email: string) => {
    if (!supabase) return { error: 'Supabase nie jest skonfigurowany.' };
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // emailRedirectTo - opcjonalne; default = Site URL z Supabase Dashboard
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    return { error: error?.message ?? null };
  };

  // OAuth Google — redirect flow. Supabase otwiera Google sign-in,
  // po sukcesie wraca na current origin z tokenem w URL hash, który
  // onAuthStateChange (powyżej) automatycznie odczyta i ustawi sesję.
  // Wymaga skonfigurowania Google provider w Supabase Dashboard
  // (Auth → Providers → Google) z Client ID/Secret z Google Cloud Console.
  const signInWithGoogle = async () => {
    if (!supabase) return { error: 'Supabase nie jest skonfigurowany.' };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return {
    user,
    loading,
    enabled: supabaseEnabled,
    signInWithMagicLink,
    signInWithGoogle,
    signOut,
  };
}
