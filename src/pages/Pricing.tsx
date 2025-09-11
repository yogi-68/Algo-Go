import React from 'react';

export const Pricing: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Simple pricing</h1>
        <p className="text-gray-600 dark:text-gray-300">Start free. Upgrade anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Free</h2>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">$0<span className="text-base font-medium text-gray-500">/mo</span></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Explore core visualizations.</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Visualize popular algorithms</li>
            <li>• Community problems</li>
            <li>• Limited per-topic access</li>
          </ul>
          <a href="/problems" className="mt-6 inline-block w-full text-center btn-secondary">Get started</a>
        </div>

        <div className="border-2 border-brand-600 rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm">
          <div className="inline-block px-2 py-1 text-xs rounded-full bg-brand-50 text-brand-700 mb-2">Most popular</div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pro</h2>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">$9<span className="text-base font-medium text-gray-500">/mo</span></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Everything you need to master DSA.</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• All visualizations unlocked</li>
            <li>• Step-by-step execution tracing</li>
            <li>• Priority support</li>
          </ul>
          <a href="/checkout" className="mt-6 inline-block w-full text-center btn-primary">Upgrade to Pro</a>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team</h2>
          <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Custom</div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">For organizations and classrooms.</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Multiple seats</li>
            <li>• Admin controls</li>
            <li>• Onboarding support</li>
          </ul>
          <a href="/feedback" className="mt-6 inline-block w-full text-center btn-secondary">Contact us</a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;


