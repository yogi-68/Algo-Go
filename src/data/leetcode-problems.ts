import { Problem } from '../types';

// Only LeetCode #1: Two Sum
export const leetcodeProblems: Problem[] = [
  {
    id: 'leetcode-1',
    leetcodeNumber: 1,
    title: '1. Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'Easy',
    topic: 'Array',
    tags: ['Array', 'Hash Table'],
    platform: 'LeetCode',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    acceptance: '54.1%',
    code: {
      python: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
      
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`
    },
    testCases: [
      {
        id: 1,
        name: "Basic Example",
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1],
        explanation: "nums[0] + nums[1] = 2 + 7 = 9"
      },
      {
        id: 2,
        name: "Negative Numbers",
        input: { nums: [-1, -2, -3, -4, -5], target: -8 },
        output: [2, 4],
        explanation: "nums[2] + nums[4] = -3 + (-5) = -8"
      },
      {
        id: 3,
        name: "Zero Target",
        input: { nums: [0, 4, 3, 0], target: 0 },
        output: [0, 3],
        explanation: "nums[0] + nums[3] = 0 + 0 = 0"
      }
    ]
  }
];
