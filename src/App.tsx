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
import Pricing from './pages/Pricing';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Explore from './pages/Explore';
import SearchPage from './pages/Search';
import Checkout from './pages/Checkout';
import Invoices from './pages/Invoices';
import HelpCenter from './pages/HelpCenter';
import Feedback from './pages/Feedback';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Public routes (must render before auth gating)
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/pricing') return <Pricing />;
  if (path === '/terms' || path === '/terms-and-conditions') return <TermsOfService />;
  if (path === '/privacy' || path === '/privacy-policy') return <PrivacyPolicy />;
  if (path === '/refund' || path === '/refund-policy') return <RefundPolicy />;
  if (path === '/explore') return <Explore />;
  if (path === '/search') return <SearchPage />;
  if (path === '/help' || path === '/help-center' || path === '/faq') return <HelpCenter />;
  if (path === '/feedback' || path === '/bug-report') return <Feedback />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/invoices') return <Invoices />;

  // Force show auth when on /auth route, even if a stale session exists
  if (typeof window !== 'undefined' && path.startsWith('/auth')) {
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