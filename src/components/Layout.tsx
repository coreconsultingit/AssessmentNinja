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
    <div className={`flex flex-col min-h-screen theme-${theme} bg-gradient-to-br from-blue-50/30 to-white`}>
      <ScrollToTop />
      <ScrollProgress />
      
      <Header className="sticky top-0 z-50 shadow-sm" />
      
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      
      <Footer className="mt-auto border-t border-blue-100/50" />
    </div>
  );
};

export default Layout;