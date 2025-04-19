import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserNinja } from 'react-icons/fa'; // Font Awesome Ninja icon

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const location = useLocation();
  const navItems = [
    { path: 'Home', label: 'Home' },
    { path: 'Student', label: 'Student' },
    { path: 'contactus', label: 'Contact Us' }
  ];

  return (
    <header className={`${className} w-full bg-blue-900 text-white`}>
      <div className="w-full px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <span className="text-3xl font-bold text-white">ANP</span>
          <FaUserNinja className="text-4xl text-white" />
          <span className="px-2 py-1 text-xs font-semibold bg-yellow-400 text-blue-900 rounded-full">
            Beta Preview
          </span>
        </div>
        <nav>
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
