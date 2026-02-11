import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text-primary flex">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
