import React from 'react';
import { Navbar } from '../shared/components/navbar';

export const PublicLayout: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;


