import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Algo-Go</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Master algorithms with interactive visualizations.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/problems" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Problems</a></li>
              <li><a href="/explore" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Explore</a></li>
              <li><a href="/search" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Search</a></li>
              <li><a href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
              <li><a href="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Bug Report / Feedback</a></li>
              <li><a href="/invoices" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Invoices</a></li>
              <li><a href="/checkout" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Upgrade to Pro</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="/refund" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Algo-Go. All rights reserved.</p>
          <div className="text-xs text-gray-500 dark:text-gray-400">support@algogo.app</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


