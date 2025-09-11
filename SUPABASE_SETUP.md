# Supabase Integration Setup Guide

## 🚀 Quick Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Click "New project"
4. Choose your organization and enter project details
5. Wait for the project to be set up

### 2. Get Your Project Credentials
1. Go to Project Settings → API
2. Copy your Project URL and anon/public key
3. Update your `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set Up Database Schema
1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL to create all tables, policies, and sample data

### 4. Configure Authentication (Optional)
1. Go to Authentication → Settings
2. Configure sign-up settings
3. Set up email templates
4. Configure OAuth providers if needed

## 📊 Database Schema

### Tables Created:
- **problems**: Stores algorithm problems with test cases
- **user_progress**: Tracks user completion and attempts
- **execution_traces**: Stores step-by-step algorithm execution data

### Features Included:
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamp updates
- ✅ Foreign key relationships
- ✅ Performance indexes
- ✅ Sample data for testing

## 🔧 API Integration

The application now includes both local data (for offline development) and Supabase methods:

### Available Methods:
```typescript
// Local data methods (existing)
apiService.getProblems()
apiService.getProblem(id)
apiService.getUserProgress(userId)

// Supabase methods (new)
apiService.getProblemsFromDB()
apiService.getProblemFromDB(id)
apiService.saveUserProgress(userId, problemId, completed, time)
apiService.getUserProgressFromDB(userId)

// Authentication
apiService.signUp(email, password)
apiService.signIn(email, password)
apiService.signOut()
apiService.getCurrentUser()
```

## 🔐 Authentication

The app includes a complete authentication system:

### AuthContext Updates:
- Supabase user management
- Real-time auth state changes
- Automatic session handling
- User profile management

### Available Hooks:
```typescript
// AuthContext hook
const { user, supabaseUser, login, signup, logout, isLoading } = useAuth();

// Custom auth hook
const { user, session, loading, signUp, signIn, signOut } = useAuth();
```

## 🎯 Next Steps

1. **Update your environment variables** with real Supabase credentials
2. **Run the database schema** in your Supabase SQL editor
3. **Test authentication** by creating a new account
4. **Migrate data fetching** from local to Supabase methods as needed

## 🔒 Security Features

- **Row Level Security**: Users can only access their own progress
- **Secure Authentication**: Built-in Supabase auth with JWT tokens
- **API Key Protection**: Environment variables keep credentials secure
- **Type Safety**: Full TypeScript support with database types

## 📱 Real-time Features

The integration includes real-time subscriptions for:
- User progress updates
- Live leaderboards (can be added)
- Collaborative features (future enhancement)

## 🐛 Troubleshooting

### Common Issues:
1. **Environment variables not loading**: Restart your dev server after updating `.env.local`
2. **Database connection errors**: Check your Supabase URL and API key
3. **RLS policy errors**: Ensure users are authenticated before accessing protected data
4. **CORS issues**: Supabase handles CORS automatically for your domain

### Development vs Production:
- The app falls back to local data if Supabase connection fails
- This ensures your app works during development even without Supabase setup
- In production, you should handle errors appropriately

## 📚 Documentation Links

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Database Functions](https://supabase.com/docs/guides/database/functions)
