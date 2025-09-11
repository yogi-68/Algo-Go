import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Loading Algo-Go</h2>
        <p className="text-slate-600">Preparing your algorithm visualization platform...</p>
      </div>
    </div>
  );
};