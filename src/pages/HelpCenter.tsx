import React from 'react';

export const HelpCenter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Help Center</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How does visualization work?</h2>
          <p className="text-gray-600 dark:text-gray-400">We animate algorithm steps and data structure mutations to help you understand the flow.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">What languages are supported?</h2>
          <p className="text-gray-600 dark:text-gray-400">Currently TypeScript/JavaScript for code editors, with plan for Python.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400">Email support: support@algogo.app • Pro users get priority chat support.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;


