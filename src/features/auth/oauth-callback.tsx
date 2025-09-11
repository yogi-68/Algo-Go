import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../../shared/ui/loading-spinner';

export const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('OAuth callback error:', error);
          navigate('/auth?error=oauth_error');
          return;
        }

        if (data.session) {
          // Successful login, redirect to main app
          navigate('/');
        } else {
          // No session found, redirect to login
          navigate('/auth');
        }
      } catch (error) {
        console.error('OAuth callback failed:', error);
        navigate('/auth?error=oauth_error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Completing sign in...
        </p>
      </div>
    </div>
  );
};
