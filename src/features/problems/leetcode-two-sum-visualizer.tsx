import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface AlgorithmStep {
  step: number;
  description: string;
  i?: number;
  num?: number;
  complement?: number;
  hashMap: Record<number, number>;
  result?: [number, number];
  variables: {
    i?: number;
    num?: number;
    complement?: number;
    hashMap?: Record<number, number>;
    result?: [number, number];
  };
}

interface TwoSumVisualizerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed?: number;
  currentStep?: number;
  selectedLanguage?: 'python' | 'java' | 'cpp';
  onLanguageChange?: (language: 'python' | 'java' | 'cpp') => void;
}

export const LeetCode1TwoSumVisualizer: React.FC<TwoSumVisualizerProps> = ({
  isPlaying,
  onTogglePlay,
  selectedLanguage: propSelectedLanguage,
  onLanguageChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'java' | 'cpp'>(
    propSelectedLanguage || 'python'
  );
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  
  // Sync with parent language selection
  useEffect(() => {
    if (propSelectedLanguage) {
      setSelectedLanguage(propSelectedLanguage);
    }
  }, [propSelectedLanguage]);
  
  // Test cases data
  const testCases = [
    {
      id: 1,
      name: "Basic Example",
      nums: [2, 7, 11, 15],
      target: 9,
      expectedOutput: [0, 1]
    },
    {
      id: 2,
      name: "Negative Numbers",
      nums: [-1, -2, -3, -4, -5],
      target: -8,
      expectedOutput: [2, 4]
    },
    {
      id: 3,
      name: "Zero Target",
      nums: [0, 4, 3, 0],
      target: 0,
      expectedOutput: [0, 3]
    }
  ];
  
  // Current test case data
  const currentTestCase = testCases[selectedTestCase];
  const nums = currentTestCase.nums;
  const target = currentTestCase.target;

  // Generate steps dynamically based on current test case
  const generateSteps = (nums: number[], target: number): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const hashMap: Record<number, number> = {};
    
    // Step 0: Initialize
    steps.push({
      step: 0,
      description: "Initialize empty hash map and start iteration",
      hashMap: {},
      variables: { hashMap: {} }
    });
    
    // Generate steps for each iteration
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const complement = target - num;
      
      if (complement in hashMap) {
        // Found solution
        steps.push({
          step: steps.length,
          description: `Check element: nums[${i}] = ${num}, complement = ${target} - ${num} = ${complement}. Found ${complement} in hash map at index ${hashMap[complement]}!`,
          i,
          num,
          complement,
          hashMap: { ...hashMap },
          result: [hashMap[complement], i],
          variables: { i, num, complement, hashMap: { ...hashMap }, result: [hashMap[complement], i] }
        });
        break;
      } else {
        // Store in hash map
        hashMap[num] = i;
        steps.push({
          step: steps.length,
          description: `Check element: nums[${i}] = ${num}, complement = ${target} - ${num} = ${complement}. ${complement} not in hash map, store ${num} at index ${i}`,
          i,
          num,
          complement,
          hashMap: { ...hashMap },
          variables: { i, num, complement, hashMap: { ...hashMap } }
        });
      }
    }
    
    return steps;
  };
  
  const steps = generateSteps(nums, target);

  // Auto-play effect
  useEffect(() => {
    let timer: number;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = window.setTimeout(() => {
        handleStepChange(currentStep + 1);
      }, 1500); // 1.5 second delay between steps
    } else if (isPlaying && currentStep === steps.length - 1) {
      onTogglePlay(); // Stop playing when reaching the end
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, onTogglePlay]);

  const handleStepChange = (newStep: number) => {
    const clampedStep = Math.max(0, Math.min(newStep, steps.length - 1));
    setCurrentStep(clampedStep);
  };


  const currentStepData = steps[currentStep];

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 overflow-hidden">
      <div className="w-full h-full pb-24">
        
        {/* Test Case and Language Selector */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Test Case:</label>
              <select
                value={selectedTestCase}
                onChange={(e) => {
                  setSelectedTestCase(parseInt(e.target.value));
                  setCurrentStep(0);
                }}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                {testCases.map((testCase, index) => (
                  <option key={testCase.id} value={index}>
                    {testCase.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Input: [{nums.join(', ')}], Target: {target}
            </div>
          </div>
          
        </div>
        
        <div className="grid grid-cols-12 gap-4 sm:gap-6 h-full">
          
          {/* Left Panel - Variables, Step Explanation, Final Result */}
          <div className="col-span-12 md:col-span-4 space-y-4 h-full overflow-y-auto">
            {/* Variables */}
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Variables</h3>
              <div className="space-y-2 text-sm">
                {currentStepData.variables.i !== undefined && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded border-l-2 border-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">i:</span> 
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{currentStepData.variables.i}</span>
                  </div>
                )}
                {currentStepData.variables.num !== undefined && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded border-l-2 border-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">num:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{currentStepData.variables.num}</span>
                  </div>
                )}
                {currentStepData.variables.complement !== undefined && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded border-l-2 border-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">complement:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{currentStepData.variables.complement}</span>
                  </div>
                )}
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded border-l-2 border-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">hashMap:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400 font-mono text-xs">
                    {JSON.stringify(currentStepData.variables.hashMap || {})}
                  </span>
                </div>
                {currentStepData.variables.result && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded border-l-2 border-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">result:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">
                      [{currentStepData.variables.result.join(', ')}]
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Step Explanation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Step Explanation</h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">{currentStepData.description}</p>
            </div>

            {/* Final Result */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">Final Result</h3>
              <div className="space-y-2">
                {currentStepData.result ? (
                  <>
                    <div className="text-xl font-bold text-green-700 dark:text-green-300">
                      Result: [{currentStepData.result.join(', ')}]
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Found indices {currentStepData.result[0]} and {currentStepData.result[1]} where 
                      nums[{currentStepData.result[0]}] + nums[{currentStepData.result[1]}] = {nums[currentStepData.result[0]]} + {nums[currentStepData.result[1]]} = {target}
                    </div>
                    <div className="text-xs text-green-500 dark:text-green-400">
                      Expected: [{currentTestCase.expectedOutput.join(', ')}] ✓
                    </div>
                    <div className="text-xs text-green-500 dark:text-green-400">
                      Time Complexity: O(n) | Space Complexity: O(n)
                    </div>
                  </>
                ) : (
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    Still searching for the solution...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Panel - Algorithm State Visualizer */}
          <div className="col-span-12 md:col-span-8 h-full overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4">
              {/* Array Visualization */}
              <div className="mb-4 sm:mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-center">
                  Input Array: nums = [{nums.join(', ')}], target = {target}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {nums.map((num, index) => (
                    <div
                      key={index}
                      className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-base sm:text-lg font-bold
                        border-2 transition-all duration-500 shadow-md
                        ${currentStepData.i === index
                          ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300 transform scale-110'
                          : currentStepData.result && (currentStepData.result[0] === index || currentStepData.result[1] === index)
                          ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-400 dark:text-green-300 transform scale-105'
                          : 'bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                        }
                      `}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {nums.map((_, index) => (
                    <div key={index} className="w-10 sm:w-12 text-center text-xs font-medium text-gray-500">[{index}]</div>
                  ))}
                </div>
              </div>

              {/* Hash Map Visualization */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <div className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">Hash Map:</div>
                <div className="min-h-[40px] flex items-center justify-center">
                  {Object.keys(currentStepData.hashMap).length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400 text-sm italic">Empty {}</div>
                  ) : (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {Object.entries(currentStepData.hashMap).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-purple-100 dark:bg-purple-900/30 border border-purple-500 rounded px-2 py-1"
                        >
                          <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">
                            {key}: {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fixed Controls at Bottom Center */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Reset Button */}
            <button
              onClick={() => handleStepChange(0)}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200"
              title="Reset to beginning"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Previous Step */}
            <button
              onClick={() => handleStepChange(currentStep - 1)}
              disabled={currentStep === 0}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous step"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5 sm:ml-1" />}
            </button>

            {/* Next Step */}
            <button
              onClick={() => handleStepChange(currentStep + 1)}
              disabled={currentStep === steps.length - 1}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next step"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Step Counter */}
            <div className="hidden xs:flex items-center space-x-2 px-2.5 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
