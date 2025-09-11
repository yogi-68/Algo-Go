import React from 'react';
import { Navbar } from '../shared/components/navbar';
import { Footer } from '../shared/components/footer';
import { Outlet } from 'react-router-dom';

export const PublicLayout: React.FC<{ children?: React.ReactNode }>= ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-50/40 dark:from-gray-900 dark:to-gray-900">
      <Navbar />
      <main>{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;


