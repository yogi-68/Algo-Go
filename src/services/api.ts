import { Problem, ExecutionTrace, User } from '../types/index';
import { problems } from '../data/problems';
import { executionTraces } from '../data/traces';
import { supabase } from '../lib/supabase';

// Simulate API calls with realistic delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Existing methods using local data
  async getProblems(): Promise<Problem[]> {
    await delay(500);
    return problems;
  },

  async getProblem(id: string): Promise<Problem | null> {
    await delay(300);
    return problems.find(p => p.id === id) || null;
  },

  async getExecutionTrace(problemId: string): Promise<ExecutionTrace | null> {
    await delay(800);
    return executionTraces[problemId] || null;
  },

  async getUserProgress(userId: string): Promise<User | null> {
    await delay(400);
    // This would typically fetch from a real API
    return {
      id: userId,
      name: 'Alex Thompson',
      email: 'alex@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
      solvedProblems: ['bubble-sort'],
      totalSolved: 1,
      totalProgress: 25,
      easyCount: 1,
      mediumCount: 0,
      hardCount: 0,
      streak: 3
    };
  },

  async markProblemCompleted(): Promise<boolean> {
    await delay(300);
    // This would typically update the database
    return true;
  },

  // New Supabase methods
  async getProblemsFromDB(): Promise<Problem[]> {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching problems from Supabase:', error);
      // Fallback to local data
      return this.getProblems();
    }
  },

  async getProblemFromDB(id: string): Promise<Problem | null> {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching problem from Supabase:', error);
      // Fallback to local data
      return this.getProblem(id);
    }
  },

  async saveUserProgress(userId: string, problemId: string, completed: boolean, completionTime?: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          problem_id: problemId,
          completed,
          completion_time: completionTime,
          attempts: 1,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,problem_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving user progress to Supabase:', error);
      return false;
    }
  },

  async getUserProgressFromDB(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          problems (
            id,
            title,
            difficulty,
            category
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user progress from Supabase:', error);
      return [];
    }
  },

  // Authentication methods
  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { user: null, error };
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { user: data.user, session: data.session, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { user: null, session: null, error };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Real-time subscriptions
  subscribeToUserProgress(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('user_progress_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  },

  // Admin methods
  async getAllUsers(): Promise<any[]> {
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      return data.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async deleteUser(userId: string): Promise<boolean> {
    try {
      // First delete user progress records
      const { error: progressError } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', userId);

      if (progressError) {
        console.error('Error deleting user progress:', progressError);
      }

      // Then delete the user from auth
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  },

  async deleteUserProgress(progressId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .delete()
        .eq('id', progressId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting user progress:', error);
      return false;
    }
  },

  async getAllUserProgress(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          problems (
            id,
            title,
            difficulty
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all user progress:', error);
      return [];
    }
  },

  async getAdminStats(): Promise<any> {
    try {
      // Get total users
      const { data: usersData } = await supabase.auth.admin.listUsers();
      const totalUsers = usersData?.users?.length || 0;

      // Get total problems
      const { count: totalProblems } = await supabase
        .from('problems')
        .select('*', { count: 'exact', head: true });

      // Get total completions
      const { count: totalCompletions } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('completed', true);

      // Get active users (signed in within last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const activeUsers = usersData?.users?.filter(user => 
        user.last_sign_in_at && new Date(user.last_sign_in_at) > thirtyDaysAgo
      ).length || 0;

      return {
        totalUsers,
        totalProblems: totalProblems || 0,
        totalCompletions: totalCompletions || 0,
        activeUsers
      };
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return {
        totalUsers: 0,
        totalProblems: 0,
        totalCompletions: 0,
        activeUsers: 0
      };
    }
  },

  async updateUserRole(userId: string, role: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { role }
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  }
};