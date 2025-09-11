import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { problems } from '../data/problems';
import { ProblemDetail } from '../features/problems/problem-detail';

export const ProblemRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const problem = problems.find(p => p.id === id);

  if (!problem) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-700 dark:text-gray-300">
        Problem not found.
      </div>
    );
  }

  return (
    <ProblemDetail problem={problem} onBack={() => navigate(-1)} />
  );
};

export default ProblemRoute;


