import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExecutionProvider } from './contexts/ExecutionContext';
import { AuthContainer } from './features/auth/auth-container';
import { LoadingSpinner } from './shared/ui/loading-spinner';
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
import DashboardPage from './pages/Dashboard';
import ProblemRoute from './pages/ProblemRoute';
import AppLayout from './layouts/AppLayout';
import PublicLayout from './layouts/PublicLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;

  return (
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
        <Route path="/" element={<DashboardPage />} />
        <Route path="/problem/:id" element={<ProblemRoute />} />
        <Route path="/invoices" element={<Invoices />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExecutionProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ExecutionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;