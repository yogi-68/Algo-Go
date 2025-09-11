import React from 'react';
import { Navbar } from '../shared/components/navbar';
import { Footer } from '../shared/components/footer';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC<{ children?: React.ReactNode; onProblemsClick?: () => void; onProfileClick?: () => void }>= ({ children, onProblemsClick, onProfileClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-50/40 dark:from-gray-900 dark:to-gray-900 flex flex-col">
      <Navbar onProblemsClick={onProblemsClick} onProfileClick={onProfileClick} />
      <main className="flex-1">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;


