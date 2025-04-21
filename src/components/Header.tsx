import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClipboardCheck, Home, GraduationCap, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const location = useLocation();
  const navItems = [
    { path: 'home', label: 'Professionals', icon: <Home className="w-4 h-4" /> },
    { path: 'student', label: 'Students', icon: <GraduationCap className="w-4 h-4" /> },
    { path: 'contact-us', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className={`bg-white backdrop-blur-sm bg-opacity-80 text-blue-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors"
          >
            <ClipboardCheck className="text-white w-6 h-6" />
          </motion.div>
          <div>
            <div className="text-2xl font-bold tracking-tight leading-tight group-hover:text-blue-700 transition-colors">
              ANP
            </div>
            <div className="text-xs text-blue-600/80 leading-none group-hover:text-blue-700/80 transition-colors">
              Assessment Ninja Portal
            </div>
          </div>
        </Link>

        <nav className="mt-3 sm:mt-0">
          <ul className="flex gap-4 sm:gap-6 items-center">
            {navItems.map(({ path, label, icon }) => {
              const isActive = location.pathname.toLowerCase().includes(path.toLowerCase());
              return (
                <motion.li 
                  key={path}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/${path}`}
                    className={`flex items-center gap-1 text-sm sm:text-[15px] font-medium tracking-wide transition-all duration-200 pb-1 ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-blue-900/80 hover:text-blue-600'
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;