import React from 'react';
import { ProblemList } from '../features/problems/problem-list';
import { Problem } from '../types';

export const DashboardPage: React.FC = () => {
  const onSelect = (_p: Problem) => {
    // In router world, this would navigate to a problem detail route.
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
      <ProblemList onProblemSelect={onSelect} />
    </div>
  );
};

export default DashboardPage;


