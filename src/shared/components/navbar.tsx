import React, { useState } from 'react';
import { Code2, Settings, Moon, Sun, Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  onProblemsClick?: () => void;
  onProfileClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onProblemsClick, onProfileClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-brand-500 to-brand-700 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Algo-Go
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/problems"
              className={`font-medium transition-colors ${
                isActive('/problems') || isActive('/')
                  ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              Problems
            </a>
            <a
              href="/explore"
              className={`font-medium transition-colors ${
                isActive('/explore')
                  ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              Explore
            </a>
            <a
              href="/search"
              className={`font-medium transition-colors ${
                isActive('/search')
                  ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              Search
            </a>
            <a
              href="/pricing"
              className={`font-medium transition-colors ${
                isActive('/pricing')
                  ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              Pricing
            </a>
            {/* Checkout and Invoices removed from header; available via footer and routes */}
            <a
              href="/help"
              className={`font-medium transition-colors ${
                isActive('/help')
                  ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              Support
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* User Profile */}
                <button
                  onClick={onProfileClick}
                  className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Algorithm Visualizer</div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                  Sign In
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <a
                href="/problems"
                className={`text-left font-medium transition-colors ${
                  isActive('/problems') || isActive('/')
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                Problems
              </a>
              <a
                href="/explore"
                className={`font-medium transition-colors ${
                  isActive('/explore')
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                Explore
              </a>
              <a
                href="/search"
                className={`font-medium transition-colors ${
                  isActive('/search')
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                Search
              </a>
              <a
                href="/pricing"
                className={`font-medium transition-colors ${
                  isActive('/pricing')
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                Pricing
              </a>
              {/* Checkout and Invoices removed from mobile header; available via footer and routes */}
              <a
                href="/help"
                className={`font-medium transition-colors ${
                  isActive('/help')
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                Support
              </a>
              <a href="/feedback" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Feedback</a>
              <a href="/terms" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Terms</a>
              <a href="/privacy" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy</a>
              <a href="/refund" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Refunds</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};