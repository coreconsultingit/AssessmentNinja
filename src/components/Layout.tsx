// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../state/hooks';
import ScrollToTop from './ScrollToTop';
import ScrollProgress from './ScrollProgress';

const Layout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen theme-${theme}`}>
      <ScrollToTop />
      <ScrollProgress />
      
      <Header className="sticky top-0 z-50" />
      
      <main className="flex-1 relative bg-gradient-to-r from-blue-50 to-blue-100 transition-colors duration-300">
        <Outlet />
      </main>
      
      <Footer className="mt-auto" />
    </div>
  );
};

export default Layout;
