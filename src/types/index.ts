export interface Problem {
  id: string;
  leetcodeNumber?: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  tags: string[];
  platform: 'LeetCode' | 'HackerRank' | 'CodeForces' | 'Custom';
  platformId?: string;
  platformUrl?: string;
  source?: string;
  timeComplexity: string;
  spaceComplexity: string;
  acceptance?: string;
  code: {
    python: string;
    java: string;
    cpp: string;
  };
  testCases: TestCase[];
  sampleInput?: string;
  sampleOutput?: string;
  constraints?: string[];
  hints?: string[];
}

export interface TestCase {
  id?: number;
  name?: string;
  input: any;
  output?: any;
  expectedOutput?: any;
  explanation?: string;
}

export interface ExecutionStep {
  lineNumber: number;
  variables: Record<string, unknown>;
  arrayState?: number[];
  highlightedElements?: number[];
  swappedElements?: [number, number];
  message?: string;
  callStack?: string[];
  graphState?: GraphState;
  dpTable?: number[][];
}

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  visitedNodes: number[];
  currentNode?: number;
  queue?: number[];
  stack?: number[];
}

export interface GraphNode {
  id: number;
  x: number;
  y: number;
  label: string;
  visited?: boolean;
  distance?: number;
}

export interface GraphEdge {
  source: number;
  target: number;
  weight?: number;
}

export interface ExecutionTrace {
  problemId: string;
  language: string;
  steps: ExecutionStep[];
  totalSteps: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin';
  // Optional professional profile fields
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface FilterOptions {
  difficulty: string[];
  topics: string[];
  status: 'all' | 'solved' | 'unsolved';
  sortBy: 'title' | 'difficulty' | 'topic' | 'status';
  sortOrder: 'asc' | 'desc';
}

// Supabase Database Types
export interface SupabaseProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  solution: string;
  test_cases: any[];
  created_at: string;
  updated_at: string;
}

export interface SupabaseUserProgress {
  id: string;
  user_id: string;
  problem_id: string;
  completed: boolean;
  completion_time: number | null;
  attempts: number;
  created_at: string;
  updated_at: string;
}

export interface SupabaseExecutionTrace {
  id: string;
  problem_id: string;
  trace_data: any;
  created_at: string;
}

// Auth Types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: AuthUser;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Real-time Subscription Types
export interface RealtimePayload<T> {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: T;
  old: T;
  table: string;
  schema: string;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  last_sign_in_at?: string;
  email_confirmed_at?: string;
  role?: string;
}

export interface AdminUserProgress {
  id: string;
  user_id: string;
  problem_id: string;
  completed: boolean;
  completion_time?: number;
  attempts: number;
  created_at: string;
  updated_at: string;
  user_email?: string;
  problem_title?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalProblems: number;
  totalCompletions: number;
  activeUsers: number;
}

// Code Editor Types
export interface CodeEditorProps {
  problem: Problem;
  selectedLanguage: 'python' | 'java' | 'cpp';
  highlightedLine?: number;
  onLanguageChange: (language: 'python' | 'java' | 'cpp') => void;
}

export interface CodeViewerState {
  selectedLanguage: 'python' | 'java' | 'cpp';
  highlightedLine: number | null;
  isReadOnly: boolean;
}