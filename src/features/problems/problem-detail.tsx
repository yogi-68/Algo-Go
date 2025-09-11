import React, { useState } from 'react';
import { ArrowLeft, Clock, Target, Copy, Check } from 'lucide-react';
import { Problem } from '../../types';
import { LeetCodeStyle } from './platform-styles/leetcode-style';
import { CustomStyle } from './platform-styles/custom-style';
import { LeetCode1TwoSumVisualizer } from './leetcode-two-sum-visualizer';
import { useExecution } from '../../contexts/ExecutionContext';

interface ProblemDetailProps {
  problem: Problem;
  onBack: () => void;
}

export const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem, onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'java' | 'cpp'>('python');
  const [activeTab, setActiveTab] = useState<'description' | 'visualization'>('visualization');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed] = useState(1);
  const [copied, setCopied] = useState(false);
  const { getCurrentStep } = useExecution();

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(problem.code[selectedLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };


  const handleLanguageChange = (language: 'python' | 'java' | 'cpp') => {
    setSelectedLanguage(language);
  };

  const renderLeetCodeVisualizer = () => {
    const visualizerRegistry: Record<string, React.ReactNode> = {
      'leetcode-1': (
        <LeetCode1TwoSumVisualizer 
          isPlaying={isPlaying} 
          onTogglePlay={togglePlay} 
          speed={speed} 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )
    };
    return visualizerRegistry[problem.id] ?? (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">Visualization not available for this problem</div>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const renderPlatformSpecificContent = () => {
    switch (problem.platform) {
      case 'LeetCode':
        return <LeetCodeStyle problem={problem} />;
      case 'HackerRank':
      case 'CodeForces':
      case 'Custom':
      default:
        return <CustomStyle problem={problem} />;
    }
  };

  const languages = [
    { value: 'python', label: 'Python', icon: '🐍', color: 'bg-blue-500' },
    { value: 'java', label: 'Java', icon: '☕', color: 'bg-orange-500' },
    { value: 'cpp', label: 'C++', icon: '⚡', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{problem.title}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">{problem.platform}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Panel - Problem Content */}
          <div className="col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'visualization', label: 'Visualization' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'description' && renderPlatformSpecificContent()}

                {activeTab === 'visualization' && (
                  <div className="w-full">
                    {renderLeetCodeVisualizer()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Code Implementation */}
          <div className="col-span-1 space-y-6">
            {/* Code Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              

              {/* Language Selector */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Language:</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as 'python' | 'java' | 'cpp')}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                  >
                    <option value="python">🐍 Python</option>
                    <option value="java">☕ Java</option>
                    <option value="cpp">⚡ C++</option>
                  </select>
                </div>
              </div>

              {/* Code Display */}
              <div className="p-4">
                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-2">
                  {/* Code Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm font-mono">
                        solution.{selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-sm transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  
                  {/* Code Content */}
                  <pre className="text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto">
                    {problem.code[selectedLanguage].split('\n').map((line, index) => {
                      const lineNumber = index + 1;
                      return (
                        <div key={index} className="flex items-start">
                          <span className="inline-block w-10 pr-2 text-right select-none text-sm font-mono text-gray-500">
                            {lineNumber}
                          </span>
                          <code className="whitespace-pre flex-1">
                            {line || ' '}
                          </code>
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Complexity</span>
                </div>
                <span className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                  {problem.timeComplexity}
                </span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Space Complexity</span>
                </div>
                <span className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                  {problem.spaceComplexity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
