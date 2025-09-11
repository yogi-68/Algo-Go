import React from 'react';

export const Checkout: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Unlock all visualizations with Pro.</p>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">Algo-Go Pro</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Monthly subscription</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">$9</div>
        </div>
        <a href="/pricing" className="mt-6 inline-block btn-primary">Proceed to payment</a>
      </div>
    </div>
  );
};

export default Checkout;


