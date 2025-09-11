import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Invoices: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Invoices</h1>
        <p className="text-gray-600 dark:text-gray-400">Please sign in to view your invoices.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Invoices</h1>
      <div className="rounded-md border border-gray-200 dark:border-gray-700 p-6 text-gray-600 dark:text-gray-400">
        No invoices yet.
      </div>
    </div>
  );
};

export default Invoices;


