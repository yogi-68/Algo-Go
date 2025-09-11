import React from 'react';

export const Checkout: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Complete your purchase to unlock Pro features.</p>
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">Algo-Go Pro</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Monthly subscription</div>
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">$9</div>
        </div>
        <a href="/pricing" className="mt-6 inline-block px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white">Proceed to Payment</a>
      </div>
    </div>
  );
};

export default Checkout;


