import React from 'react';

export const Pricing: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Pricing</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Choose a plan that fits your learning journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Free</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">$0/month</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Basic algorithm visualizations</li>
            <li>Community problems</li>
            <li>Limited execution steps</li>
          </ul>
        </div>

        <div className="border-2 border-blue-500 rounded-lg p-6 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pro</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">$9/month</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>All visualizations unlocked</li>
            <li>Step-by-step execution tracing</li>
            <li>Priority support</li>
          </ul>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Team</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Contact us</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Seats for your organization</li>
            <li>Admin tools</li>
            <li>Custom onboarding</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;


