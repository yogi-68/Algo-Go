import React, { useMemo } from 'react';
import { CodeEditorProps } from '../../types';

const CodeEditor: React.FC<CodeEditorProps> = ({ problem, selectedLanguage, highlightedLine, onLanguageChange }) => {
  const code = useMemo(() => problem.code[selectedLanguage] || '', [problem, selectedLanguage]);

  const lines = useMemo(() => code.split('\n'), [code]);

  // Debug logging
  console.log('CodeEditor render:', { selectedLanguage, codeLength: code.length });

  const languageOptions = [
    { value: 'python', label: '🐍 Python', color: 'bg-blue-500' },
    { value: 'java', label: '☕ Java', color: 'bg-orange-500' },
    { value: 'cpp', label: '⚡ C++', color: 'bg-purple-500' }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header with Language Tabs */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Code Implementation</h3>
          <div className="flex items-center space-x-3">
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">Read Only</span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
            >
              Copy Code
            </button>
          </div>
        </div>
        
        {/* Language Tabs */}
        <div className="flex px-6 pb-0 gap-2">
          {languageOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                console.log('Switching to:', option.value);
                onLanguageChange(option.value as 'python' | 'java' | 'cpp');
              }}
              className={`px-8 py-4 rounded-t-xl text-base font-bold transition-all duration-300 border-b-4 transform hover:scale-105 ${
                selectedLanguage === option.value
                  ? `${option.color} text-white shadow-2xl border-transparent scale-105`
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Display */}
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-b-lg">
        <div className="h-full p-6">
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 h-full overflow-auto border border-gray-800 shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-400 text-sm font-mono">
                  solution.{selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
                </span>
                <div className={`ml-4 px-4 py-2 text-white text-sm font-bold rounded-lg ${
                  selectedLanguage === 'python' ? 'bg-blue-500' :
                  selectedLanguage === 'java' ? 'bg-orange-500' :
                  'bg-purple-500'
                }`}>
                  {selectedLanguage === 'python' ? '🐍 PYTHON' :
                   selectedLanguage === 'java' ? '☕ JAVA' :
                   '⚡ C++'}
                </div>
              </div>
            </div>
            
            <pre className="text-sm font-mono text-gray-300 leading-relaxed">
              {lines.map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = highlightedLine === lineNumber;
                return (
                  <div key={index} className={`${isHighlighted ? 'bg-yellow-400/20 border-l-4 border-yellow-400' : ''} flex items-start` }>
                    <span className={`inline-block w-10 pr-2 text-right select-none ${isHighlighted ? 'text-yellow-300 font-bold' : 'text-gray-500'}`}>{lineNumber}</span>
                    <code className={`whitespace-pre ${isHighlighted ? 'font-medium text-gray-100' : ''}`}>{line || ' '}</code>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;


