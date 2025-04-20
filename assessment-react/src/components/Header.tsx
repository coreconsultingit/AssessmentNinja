import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClipboardCheck } from 'lucide-react'; // Clean, professional icon

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const location = useLocation();
  const navItems = [
    { path: 'home', label: 'Home' },
    { path: 'student', label: 'Student' },
    { path: 'contact-us', label: 'Contact Us' },
  ];

  return (
    <header className={`bg-blue-900 text-white shadow ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center gap-3">
          <ClipboardCheck className="text-white w-8 h-8" />
          <div>
            <div className="text-2xl font-bold tracking-tight leading-tight">ANP</div>
            <div className="text-xs text-blue-100 leading-none">Assessment Ninja Portal</div>
          </div>
          <span className="ml-3 px-2 py-0.5 text-[11px] font-semibold bg-yellow-400 text-blue-900 rounded-full">
            Beta
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-3 sm:mt-0">
          <ul className="flex gap-6 sm:gap-10 items-center">
            {navItems.map(({ path, label }) => {
              const isActive = location.pathname.toLowerCase().includes(path.toLowerCase());
              return (
                <li key={path}>
                  <Link
                    to={`/${path}`}
                    className={`text-sm sm:text-base font-medium tracking-wide transition-all duration-200 pb-1 border-b-2 ${
                      isActive
                        ? 'text-yellow-400 border-yellow-400'
                        : 'text-white border-transparent hover:text-yellow-300 hover:border-yellow-300'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
