import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const location = useLocation();
  const navItems = [
    { path: 'Home', label: 'Home' },
    { path: 'contactus', label: 'Contact Us' }
  ];
  return (
    <header className={`${className} w-full bg-blue-900 text-white`}>
      <div className="w-full px-4 py-2 flex items-center">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-white">Assessment Ninja</span>
          <span className="px-2 py-1 text-xs font-semibold bg-yellow-400 text-blue-900 rounded-full">
            Beta Preview
          </span>
        </div>
        <nav className="flex-grow flex justify-center">
          <ul className="flex space-x-8">
            {navItems.map(({ path, label }) => {
              const isActive = location.pathname.endsWith(path);
              return (
                <li key={path} className={`relative ${isActive ? 'text-yellow-400' : 'text-white'}`}>
                  <Link
                    className={`text-2xl font-semibold hover:text-yellow-300 px-4 py-2 transition-colors duration-300`}
                    to={path}
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
