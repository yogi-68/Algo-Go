import React from 'react';
import { Problem } from '../../../types';
import { ExternalLink } from 'lucide-react';

interface LeetCodeStyleProps {
  problem: Problem;
}

export const LeetCodeStyle: React.FC<LeetCodeStyleProps> = ({ problem }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const descriptionHtml = (problem.description || '')
    .replace(/\n\n/g, '</p><p class="mt-4">')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');

  const hasSample = Boolean(problem.sampleInput || problem.sampleOutput || problem.testCases?.[0]?.explanation);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* LeetCode Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-medium text-gray-900 dark:text-white">
                {problem.leetcodeNumber ? `${problem.leetcodeNumber}. ` : ''}{problem.title}
              </h1>
              {problem.platformUrl && (
                <a
                  href={problem.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Content */}
      <div className="px-6 py-6">
        <div className="max-w-none prose prose-sm dark:prose-invert">
          {/* Description */}
          <div className="mb-8">
            <div 
              className="text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ 
                __html: descriptionHtml
              }}
            />
          </div>

          {/* Examples */}
          {hasSample && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Example:</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-2">
                  {problem.sampleInput && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Input:</span>
                      <span className="ml-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {problem.sampleInput}
                      </span>
                    </div>
                  )}
                  {problem.sampleOutput && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Output:</span>
                      <span className="ml-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {problem.sampleOutput}
                      </span>
                    </div>
                  )}
                  {problem.testCases?.[0]?.explanation && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Explanation:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {problem.testCases[0].explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Additional Examples */}
          {(problem.testCases?.slice(1) || []).map((testCase, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                Example {index + 2}:
              </h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-2">
                  {testCase.input !== undefined && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Input:</span>
                      <span className="ml-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {typeof testCase.input === 'string' ? testCase.input : JSON.stringify(testCase.input)}
                      </span>
                    </div>
                  )}
                  {(testCase.expectedOutput !== undefined || testCase.output !== undefined) && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Output:</span>
                      <span className="ml-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {typeof (testCase.expectedOutput ?? testCase.output) === 'string'
                          ? (testCase.expectedOutput ?? testCase.output)
                          : JSON.stringify(testCase.expectedOutput ?? testCase.output)}
                      </span>
                    </div>
                  )}
                  {testCase.explanation && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Explanation:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {testCase.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Constraints */}
          {problem.constraints && problem.constraints.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Constraints:</h3>
              <ul className="space-y-1">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                    • {constraint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {problem.tags && problem.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
