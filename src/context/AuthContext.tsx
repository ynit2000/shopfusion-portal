
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
