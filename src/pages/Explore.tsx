import React from 'react';

const Section: React.FC<{ title: string; items: string[] }>= ({ title, items }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h2>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <a
          key={item}
          href={`/#${encodeURIComponent(item.toLowerCase())}`}
          className="px-3 py-1.5 rounded-md text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {item}
        </a>
      ))}
    </div>
  </div>
);

export const Explore: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Explore Topics</h1>
      <div className="space-y-8">
        <Section
          title="Data Structures"
          items={[
            'Arrays','Linked List','Stack','Queue','Trees','Graphs'
          ]}
        />
        <Section
          title="Algorithms"
          items={[
            'Sorting','Searching','Dynamic Programming','Greedy','Backtracking'
          ]}
        />
      </div>
    </div>
  );
};

export default Explore;


