-- Supabase Database Schema
-- Note: auth.users table is managed by Supabase and already has RLS enabled

-- Create problems table
CREATE TABLE IF NOT EXISTS public.problems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL,
    category VARCHAR(100) NOT NULL,
    solution TEXT NOT NULL,
    test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    completed BOOLEAN DEFAULT false NOT NULL,
    completion_time INTEGER, -- in milliseconds
    attempts INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, problem_id)
);

-- Create execution_traces table for storing algorithm execution steps
CREATE TABLE IF NOT EXISTS public.execution_traces (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    trace_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON public.problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_category ON public.problems(category);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_problem_id ON public.user_progress(problem_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON public.user_progress(completed);
CREATE INDEX IF NOT EXISTS idx_execution_traces_problem_id ON public.execution_traces(problem_id);

-- Row Level Security Policies
-- Problems table - public read access
DROP POLICY IF EXISTS "Problems are viewable by everyone" ON public.problems;
CREATE POLICY "Problems are viewable by everyone" ON public.problems
    FOR SELECT USING (true);

-- User progress - users can only see their own progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
CREATE POLICY "Users can view own progress" ON public.user_progress
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
CREATE POLICY "Users can insert own progress" ON public.user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
CREATE POLICY "Users can update own progress" ON public.user_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Execution traces - public read access
DROP POLICY IF EXISTS "Execution traces are viewable by everyone" ON public.execution_traces;
CREATE POLICY "Execution traces are viewable by everyone" ON public.execution_traces
    FOR SELECT USING (true);

-- Enable RLS on all tables
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_traces ENABLE ROW LEVEL SECURITY;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS handle_updated_at_problems ON public.problems;
CREATE TRIGGER handle_updated_at_problems
    BEFORE UPDATE ON public.problems
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_user_progress ON public.user_progress;
CREATE TRIGGER handle_updated_at_user_progress
    BEFORE UPDATE ON public.user_progress
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Insert sample problems
INSERT INTO public.problems (id, title, description, difficulty, category, solution, test_cases) VALUES
(
    '550e8400-e29b-41d4-a716-446655440000',
    'Two Sum',
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    'easy',
    'Array',
    'function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map.has(complement)) { return [map.get(complement), i]; } map.set(nums[i], i); } return []; }',
    '[{"input": {"nums": [2, 7, 11, 15], "target": 9}, "output": [0, 1]}, {"input": {"nums": [3, 2, 4], "target": 6}, "output": [1, 2]}]'::jsonb
),
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Binary Search',
    'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
    'easy',
    'Binary Search',
    'function search(nums, target) { let left = 0; let right = nums.length - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); if (nums[mid] === target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }',
    '[{"input": {"nums": [-1, 0, 3, 5, 9, 12], "target": 9}, "output": 4}, {"input": {"nums": [-1, 0, 3, 5, 9, 12], "target": 2}, "output": -1}]'::jsonb
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Bubble Sort',
    'Implement the bubble sort algorithm to sort an array of integers in ascending order.',
    'easy',
    'Sorting',
    'function bubbleSort(arr) { const n = arr.length; for (let i = 0; i < n - 1; i++) { for (let j = 0; j < n - i - 1; j++) { if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; } } } return arr; }',
    '[{"input": {"arr": [64, 34, 25, 12, 22, 11, 90]}, "output": [11, 12, 22, 25, 34, 64, 90]}, {"input": {"arr": [5, 2, 8, 1, 9]}, "output": [1, 2, 5, 8, 9]}]'::jsonb
);

-- Insert sample execution traces
INSERT INTO public.execution_traces (problem_id, trace_data) VALUES
(
    '550e8400-e29b-41d4-a716-446655440000',
    '{"steps": [{"step": 1, "description": "Initialize empty map", "variables": {"map": {}, "i": 0, "nums": [2, 7, 11, 15], "target": 9}}, {"step": 2, "description": "Check complement for nums[0] = 2", "variables": {"map": {}, "i": 0, "complement": 7, "nums": [2, 7, 11, 15], "target": 9}}, {"step": 3, "description": "Add nums[0] to map", "variables": {"map": {"2": 0}, "i": 0, "nums": [2, 7, 11, 15], "target": 9}}]}'::jsonb
);
