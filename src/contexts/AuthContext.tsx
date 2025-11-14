import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  checkAdminStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAdminStatus = async (): Promise<boolean> => {
    if (!session?.user) return false;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      const adminStatus = !!data;
      setIsAdmin(adminStatus);
      return adminStatus;
    } catch (error) {
      console.error('Error in checkAdminStatus:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer admin check
        if (session?.user) {
          setTimeout(async () => {
            await checkAdminStatus();
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          await checkAdminStatus();
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    const redirectUrl = `${window.location.origin}/account`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (!error) {
      navigate('/account');
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      navigate('/account');
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate('/');
  };

  const value = {
    user,
    session,
    isAdmin,
    loading,
    signUp,
    signIn,
    signOut,
    checkAdminStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
