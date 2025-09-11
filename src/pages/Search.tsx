import React, { useMemo, useState } from 'react';
import { problems } from '../data/problems';

export const SearchPage: React.FC = () => {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    if (!q.trim()) return [] as typeof problems;
    const term = q.toLowerCase();
    return problems.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.difficulty.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Search</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by algorithm or topic..."
        className="w-full mb-6 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      />
      <div className="space-y-3">
        {results.map((p) => (
          <div key={p.id} className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{p.category} • {p.difficulty}</p>
              </div>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open
              </a>
            </div>
          </div>
        ))}
        {!q && (
          <p className="text-gray-600 dark:text-gray-400">Start typing to search algorithms and topics.</p>
        )}
        {q && results.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;


