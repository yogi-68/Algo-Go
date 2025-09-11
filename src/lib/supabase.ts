import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
