import React from 'react';
import { Navbar } from '../shared/components/navbar';

export const AppLayout: React.FC<{ children: React.ReactNode; onProblemsClick?: () => void; onProfileClick?: () => void }>= ({ children, onProblemsClick, onProfileClick }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onProblemsClick={onProblemsClick} onProfileClick={onProfileClick} />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;


