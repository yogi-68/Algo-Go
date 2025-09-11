import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, Play } from 'lucide-react';
import { Problem, FilterOptions } from '../../types';
import { problems } from '../../data/problems';
import { useAuth } from '../../contexts/AuthContext';

interface ProblemListProps {
  onProblemSelect: (problem: Problem) => void;
}

export const ProblemList: React.FC<ProblemListProps> = ({ onProblemSelect }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [filters, setFilters] = useState<FilterOptions>({
    difficulty: [],
    topics: [],
    status: 'all',
    sortBy: 'title',
    sortOrder: 'asc'
  });
  const [showFilters, setShowFilters] = useState(false);

  const topics: string[] = [...new Set(problems.map((p: Problem) => p.topic))] as string[];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const platforms = ['All', 'LeetCode', 'Custom', 'HackerRank', 'CodeForces'];

  const filteredProblems = useMemo(() => {
    const filtered = problems.filter((problem: Problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesPlatform = selectedSource === 'All' || problem.platform === selectedSource;
      
      const matchesDifficulty = filters.difficulty.length === 0 || 
                               filters.difficulty.includes(problem.difficulty);
      
      const matchesTopic = filters.topics.length === 0 || 
                          filters.topics.includes(problem.topic);
      
      // Remove solve status filtering for visualizer-focused SaaS
      const matchesStatus = true;

      return matchesSearch && matchesPlatform && matchesDifficulty && matchesTopic && matchesStatus;
    });

    // Sort problems
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'difficulty': {
          const difficultyOrder: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        }
        case 'topic':
          comparison = a.topic.localeCompare(b.topic);
          break;
        case 'status': {
          const aSolved = user?.solvedProblems?.includes(a.id) || false;
          const bSolved = user?.solvedProblems?.includes(b.id) || false;
          comparison = Number(bSolved) - Number(aSolved);
          break;
        }
        default:
          comparison = a.title.localeCompare(b.title);
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [searchTerm, selectedSource, filters, user?.solvedProblems]);

  // Free plan limits: cap to 3 problems per topic unless Pro (or admin)
  const hasProAccess = (user?.role === 'admin') || ((user as unknown as { plan?: string })?.plan === 'pro');
  const visibleProblems = useMemo(() => {
    if (hasProAccess) return filteredProblems;
    const perTopicLimit = 3;
    const topicCounts: Record<string, number> = {};
    const limited: Problem[] = [];
    for (const p of filteredProblems) {
      const key = p.topic;
      topicCounts[key] = (topicCounts[key] || 0) + 1;
      if (topicCounts[key] <= perTopicLimit) {
        limited.push(p);
      }
    }
    return limited;
  }, [filteredProblems, hasProAccess]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'Hard': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const toggleFilter = (type: 'difficulty' | 'topics', value: string) => {
    setFilters((prev: FilterOptions) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item: string) => item !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Problems
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Master algorithms with interactive step-by-step visualizations
        </p>
      </div>

      {!hasProAccess && (
        <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 text-amber-900 dark:text-amber-200">
          You are on the Free plan. Viewing up to 3 problems per topic.{' '}
          <a href="/checkout" className="underline font-medium">Upgrade to Pro</a> for full access.
        </div>
      )}

      {/* Source Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {platforms.map((source) => (
              <button
                key={source}
                onClick={() => setSelectedSource(source)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedSource === source
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {source} {source !== 'All' && `(${problems.filter(p => p.source === source || p.platform === source).length})`}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Difficulty Filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Difficulty</h3>
                <div className="space-y-2">
                  {difficulties.map(difficulty => (
                    <label key={difficulty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(difficulty)}
                        onChange={() => toggleFilter('difficulty', difficulty)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`ml-2 text-sm ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topic Filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Topics</h3>
                <div className="space-y-2">
                  {topics.map((topic: string) => (
                    <label key={topic} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.topics.includes(topic)}
                        onChange={() => toggleFilter('topics', topic)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {topic}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Visualization Features */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Play className="w-4 h-4 mr-2" />
                    Interactive Visualizations
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Play className="w-4 h-4 mr-2" />
                    Step-by-Step Execution
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Play className="w-4 h-4 mr-2" />
                    Multi-Language Support
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Sort By</h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev: FilterOptions) => ({ ...prev, sortBy: e.target.value as 'title' | 'difficulty' | 'topic' | 'status' }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="title">Title</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="topic">Topic</option>
                  <option value="status">Status</option>
                </select>
                <div className="mt-2 flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sortOrder"
                      value="asc"
                      checked={filters.sortOrder === 'asc'}
                      onChange={(e) => setFilters((prev: FilterOptions) => ({ ...prev, sortOrder: e.target.value as 'asc' | 'desc' }))}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">Asc</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sortOrder"
                      value="desc"
                      checked={filters.sortOrder === 'desc'}
                      onChange={(e) => setFilters((prev: FilterOptions) => ({ ...prev, sortOrder: e.target.value as 'asc' | 'desc' }))}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">Desc</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Problems Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {visibleProblems.map((problem: Problem) => {
                return (
                  <tr
                    key={problem.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => onProblemSelect(problem)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                            {problem.platform === 'LeetCode' && problem.leetcodeNumber ? (
                              <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">{problem.leetcodeNumber}</span>
                            ) : null}
                            {problem.title}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                              {problem.platform}
                            </span>
                            {problem.tags.slice(0, 2).map((tag: string) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {problem.topic}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onProblemSelect(problem);
                        }}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        <span>Visualize</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {visibleProblems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No problems found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {visibleProblems.length} of {problems.length} problems
      </div>
    </div>
  );
};