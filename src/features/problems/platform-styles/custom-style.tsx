import React from 'react';
import { Problem } from '../../../types';
import { ChevronRight } from 'lucide-react';

interface CustomStyleProps {
  problem: Problem;
}

export const CustomStyle: React.FC<CustomStyleProps> = ({ problem }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Problem Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {problem.title}
        </h1>
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{problem.topic}</span>
          {problem.source && (
            <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
              {problem.source}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Problem Description</h3>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {problem.description}
          </p>
        </div>
      </div>

      {/* Sample Input/Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sample Input</h4>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3 font-mono text-sm text-green-400">
            {problem.sampleInput}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Expected Output</h4>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3 font-mono text-sm text-green-400">
            {problem.sampleOutput}
          </div>
        </div>
      </div>

      {/* Test Cases */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Test Cases</h4>
        <div className="space-y-3">
          {problem.testCases.map((testCase, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Input:</span>
                  <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                    {testCase.input}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Output:</span>
                  <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                    {testCase.expectedOutput || testCase.output}
                  </div>
                </div>
              </div>
              {testCase.explanation && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Explanation:</span>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{testCase.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Constraints */}
      {problem.constraints && (
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Constraints</h4>
          <ul className="space-y-1">
            {problem.constraints.map((constraint, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-gray-400" />
                <span className="font-mono">{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Complexity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Time Complexity</h4>
          <span className="text-lg font-mono font-bold text-orange-900 dark:text-orange-200">
            {problem.timeComplexity}
          </span>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Space Complexity</h4>
          <span className="text-lg font-mono font-bold text-purple-900 dark:text-purple-200">
            {problem.spaceComplexity}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
