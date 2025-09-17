import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExecutionProvider } from './contexts/ExecutionContext';
import { AuthContainer } from './features/auth/auth-container';
import { LoadingSpinner } from './shared/ui/loading-spinner';
import AppLayout from './layouts/AppLayout';
import PublicLayout from './layouts/PublicLayout';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy-loaded components
const Pricing = React.lazy(() => import('./pages/Pricing'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const RefundPolicy = React.lazy(() => import('./pages/RefundPolicy'));
const Explore = React.lazy(() => import('./pages/Explore'));
const SearchPage = React.lazy(() => import('./pages/Search'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Invoices = React.lazy(() => import('./pages/Invoices'));
const HelpCenter = React.lazy(() => import('./pages/HelpCenter'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const ProblemRoute = React.lazy(() => import('./pages/ProblemRoute'));
const ProblemsPage = React.lazy(() => import('./pages/Problems'));
const ProfilePage = React.lazy(() => import('./features/auth/profile-page'));

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  console.log('AppRoutes render - user:', user, 'isLoading:', isLoading);
  if (isLoading) return <LoadingSpinner />;

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}> 
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<AuthContainer />} />
      </Route>

      {/* Protected */}
      <Route element={user ? <AppLayout /> : <Navigate to="/auth" replace />}> 
        <Route path="/" element={<Navigate to="/problems" replace />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem/:id" element={<ProblemRoute />} />
        <Route path="/profile" element={<ProfilePage onBack={() => window.history.back()} />} />
        <Route path="/invoices" element={<Invoices />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </React.Suspense>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExecutionProvider>
          <AppRoutes />
        </ExecutionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;