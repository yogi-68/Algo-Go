import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExecutionProvider } from './contexts/ExecutionContext';
import { Navbar } from './shared/components/navbar';
import { AuthContainer } from './features/auth/auth-container';
import { ProfilePage } from './features/auth/profile-page';
import { ProblemList } from './features/problems/problem-list';
import { ProblemDetail } from './features/problems/problem-detail';
import { LoadingSpinner } from './shared/ui/loading-spinner';
import { Problem } from './types';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Force show auth when on /auth route, even if a stale session exists
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/auth')) {
    return <AuthContainer />;
  }

  if (!user) {
    return <AuthContainer />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        onProblemsClick={() => {
          setSelectedProblem(null);
          setShowProfile(false);
        }}
        onProfileClick={() => {
          setShowProfile(true);
          setSelectedProblem(null);
        }}
      />
      
      <main>
        {showProfile ? (
          <ProfilePage onBack={() => setShowProfile(false)} />
        ) : selectedProblem ? (
          <ProblemDetail
            problem={selectedProblem}
            onBack={() => setSelectedProblem(null)}
          />
        ) : (
          <ProblemList onProblemSelect={setSelectedProblem} />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExecutionProvider>
          <AppContent />
        </ExecutionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;