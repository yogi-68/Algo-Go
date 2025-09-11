import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Create a client only when configuration exists. In other environments (e.g.,
// preview deployments without env vars), export a null client so the app can
// degrade gracefully (e.g., use demo mode).
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null as unknown as ReturnType<typeof createClient>

// Database types (you can generate these from your Supabase dashboard)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      problems: {
        Row: {
          id: string
          title: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          category: string
          solution: string
          test_cases: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          category: string
          solution: string
          test_cases: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          category?: string
          solution?: string
          test_cases?: any[]
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          problem_id: string
          completed: boolean
          completion_time: number | null
          attempts: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          problem_id: string
          completed?: boolean
          completion_time?: number | null
          attempts?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          problem_id?: string
          completed?: boolean
          completion_time?: number | null
          attempts?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
