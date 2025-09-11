import { ExecutionTrace } from '../types';

export const executionTraces: Record<string, ExecutionTrace> = {
  'two-sum': {
    problemId: 'two-sum',
    language: 'python',
    totalSteps: 8,
    steps: [
      {
        lineNumber: 1,
        variables: { nums: [2, 7, 11, 15], target: 9, num_map: {} },
        arrayState: [2, 7, 11, 15],
        message: 'Starting Two Sum with nums = [2, 7, 11, 15], target = 9'
      },
      {
        lineNumber: 3,
        variables: { nums: [2, 7, 11, 15], target: 9, num_map: {}, i: 0, num: 2 },
        arrayState: [2, 7, 11, 15],
        highlightedElements: [0],
        message: 'Processing nums[0] = 2, complement = 9 - 2 = 7'
      },
      {
        lineNumber: 4,
        variables: { nums: [2, 7, 11, 15], target: 9, num_map: {}, complement: 7 },
        arrayState: [2, 7, 11, 15],
        message: 'Check if complement 7 exists in map... not found'
      },
      {
        lineNumber: 7,
        variables: { nums: [2, 7, 11, 15], target: 9, num_map: { 2: 0 }, i: 0 },
        arrayState: [2, 7, 11, 15],
        message: 'Store nums[0] = 2 at index 0 in hash map'
      },
      {
        lineNumber: 3,
        variables: { nums: [2, 7, 11, 15], target: 9, num_map: { 2: 0 }, i: 1, num: 7 },
        arrayState: [2, 7, 11, 15],
        highlightedElements: [1],
        message: 'Processing nums[1] = 7, complement = 9 - 7 = 2'
      },
      {
        lineNumber: 4,
        variables: { nums: [2, 7, 11, 15], target: 9, num_map: { 2: 0 }, complement: 2 },
        arrayState: [2, 7, 11, 15],
        highlightedElements: [0, 1],
        message: 'Check if complement 2 exists in map... found at index 0!'
      },
      {
        lineNumber: 5,
        variables: { result: [0, 1] },
        arrayState: [2, 7, 11, 15],
        highlightedElements: [0, 1],
        message: 'Return indices [0, 1] - nums[0] + nums[1] = 2 + 7 = 9 ✅'
      },
      {
        lineNumber: 8,
        variables: { result: [0, 1] },
        arrayState: [2, 7, 11, 15],
        highlightedElements: [0, 1],
        message: 'Two Sum solution found successfully!'
      }
    ]
  }
};
