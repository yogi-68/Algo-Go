import React, { useState } from 'react';
import { LoginForm } from './login-form';
import { SignUpForm } from './signup-form';

export const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      {isLogin ? (
        <LoginForm onSwitchToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onBackToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};
