import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: 'user' | 'admin';
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      if (!isSupabaseConfigured || !supabase) {
        // Degrade gracefully: unauthenticated by default; allow demo login path
        setIsLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        // Convert Supabase user to our User interface
        const appUser: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          avatar: session.user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.email?.split('@')[0] || 'User')}&background=3b82f6&color=ffffff&size=32`,
          role: session.user.user_metadata?.role || 'user',
          bio: session.user.user_metadata?.bio,
          location: session.user.user_metadata?.location,
          website: session.user.user_metadata?.website,
          twitter: session.user.user_metadata?.twitter,
          linkedin: session.user.user_metadata?.linkedin,
          github: session.user.user_metadata?.github,
        };
        setUser(appUser);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes (only when configured)
    if (!isSupabaseConfigured || !supabase) {
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setSupabaseUser(session.user);
          const appUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            avatar: session.user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.email?.split('@')[0] || 'User')}&background=3b82f6&color=ffffff&size=32`,
            role: session.user.user_metadata?.role || 'user',
            bio: session.user.user_metadata?.bio,
            location: session.user.user_metadata?.location,
            website: session.user.user_metadata?.website,
            twitter: session.user.user_metadata?.twitter,
            linkedin: session.user.user_metadata?.linkedin,
            github: session.user.user_metadata?.github,
          };
          setUser(appUser);
        } else {
          setSupabaseUser(null);
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Check for demo account first
      if (email === 'demo@algogo.com' && password === 'demo123') {
        const demoUser: User = {
          id: 'demo-user',
          email: 'demo@algogo.com',
          name: 'Demo User',
          avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=3b82f6&color=ffffff&size=32',
          role: 'admin', // Demo user has admin access
        };
        setUser(demoUser);
        setSupabaseUser(null); // Demo user is not a Supabase user
        return true;
      }

      // Try Supabase authentication for real users
      if (!isSupabaseConfigured || !supabase) {
        // When not configured, disable real login
        return false;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      return !!data.user;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured || !supabase) {
        return false;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0],
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=3b82f6&color=ffffff&size=32`
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return false;
      }

      return !!data.user;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // If it's a demo user, just clear the state
      if (user?.id === 'demo-user') {
        setUser(null);
        setSupabaseUser(null);
        return;
      }

      // For Supabase users, sign out from Supabase
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Logout error:', error);
        }
      }
      
      // Clear local state
      setUser(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!supabaseUser || !isSupabaseConfigured || !supabase) return false;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: updates.name,
          avatar_url: updates.avatar,
          bio: updates.bio,
          location: updates.location,
          website: updates.website,
          twitter: updates.twitter,
          linkedin: updates.linkedin,
          github: updates.github,
        }
      });

      if (error) {
        console.error('Profile update error:', error);
        return false;
      }

      // Update local user state
      if (user) {
        setUser({ ...user, ...updates });
      }

      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured || !supabase) {
        return false;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Password reset failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured || !supabase) {
        return { success: false, error: 'Auth is not configured in this environment.' };
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google login error:', error);
        
        // Handle specific error cases
        if (error.message?.includes('provider is not enabled')) {
          return { 
            success: false, 
            error: 'Google login is not configured. Please contact support or use email/password login.' 
          };
        }
        
        if (error.message?.includes('redirect_uri_mismatch')) {
          return { 
            success: false, 
            error: 'Google OAuth configuration error. Please contact support or use email/password login.' 
          };
        }
        
        return { 
          success: false, 
          error: 'Google login failed. Please try again or use email/password login.' 
        };
      }

      // The OAuth flow will redirect, so we don't need to wait for completion here
      return { success: true };
    } catch (error) {
      console.error('Google login failed:', error);
      return { 
        success: false, 
        error: 'Google login failed. Please try again or use email/password login.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    supabaseUser,
    login,
    signup,
    loginWithGoogle,
    logout,
    updateProfile,
    resetPassword,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};