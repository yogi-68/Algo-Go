import React from 'react';

export const HelpCenter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Help Center</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Answers to common questions.</p>
      <div className="space-y-6">
        <details className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">How does visualization work?</summary>
          <p className="mt-2 text-gray-600 dark:text-gray-400">We animate algorithm steps and data structure updates so you can see each transition clearly.</p>
        </details>
        <details className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">What languages are supported?</summary>
          <p className="mt-2 text-gray-600 dark:text-gray-400">TypeScript/JavaScript today. Python is on our roadmap.</p>
        </details>
        <details className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">How do I upgrade to Pro?</summary>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Go to <a href="/checkout" className="text-brand-600">Checkout</a> and select a plan.</p>
        </details>
        <div className="text-gray-600 dark:text-gray-400">Need more help? Email <span className="text-gray-900 dark:text-white">support@algogo.app</span>.</div>
      </div>
    </div>
  );
};

export default HelpCenter;


