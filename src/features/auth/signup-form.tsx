import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SignUpFormProps {
  onBackToLogin: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const { signup, isLoading, loginWithGoogle } = useAuth();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate all fields
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const success = await signup(formData.email, formData.password, formData.name);
      if (success) {
        setSuccess('Account created successfully! Please check your email to verify your account.');
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setValidationErrors({});
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('Signup failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSuccess('');
    try {
      const result = await loginWithGoogle();
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Google signup failed. Please try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
            <div className="mb-8 text-center">
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Create Account</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Join Algo-Go and start learning</p>
            </div>

            <motion.form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Full Name
                </label>
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    animate={{ scale: isNameFocused ? 1.08 : 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <User className={`w-5 h-5 ${isNameFocused ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </motion.div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={(e) => {
                      setIsNameFocused(false);
                      handleBlur(e);
                    }}
                    className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      validationErrors.name 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {validationErrors.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-1 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.name}</span>
                  </motion.div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email Address
                </label>
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    animate={{ scale: isEmailFocused ? 1.08 : 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <Mail className={`w-5 h-5 ${isEmailFocused ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </motion.div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={(e) => {
                      setIsEmailFocused(false);
                      handleBlur(e);
                    }}
                    className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      validationErrors.email 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {validationErrors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-1 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.email}</span>
                  </motion.div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Password
                </label>
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    animate={{ scale: isPasswordFocused ? 1.08 : 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <Lock className={`w-5 h-5 ${isPasswordFocused ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </motion.div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={(e) => {
                      setIsPasswordFocused(false);
                      handleBlur(e);
                    }}
                    className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      validationErrors.password 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                    placeholder="Create a password"
                    required
                    minLength={6}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </motion.button>
                </div>
                {validationErrors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-1 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.password}</span>
                  </motion.div>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400">Password must contain uppercase, lowercase, number, and be at least 6 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      validationErrors.confirmPassword 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </motion.button>
                </div>
                {validationErrors.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-1 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.confirmPassword}</span>
                  </motion.div>
                )}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-200 px-4 py-3 rounded-xl text-sm flex items-center space-x-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-200 px-4 py-3 rounded-xl text-sm flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{success}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Google Signup Button */}
              <motion.button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </motion.button>

              {/* Note about Google OAuth */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Google signup requires OAuth configuration. Use email/password if unavailable.
              </p>
            </motion.form>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <button
                  onClick={onBackToLogin}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
