import React from 'react';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={`${className} w-full bg-blue-900 text-gray-300`}>
      <div className="w-full px-4 py-2 text-center">
        <p className="text-sm">
          © 2024 Powered By <a  href="https://coreconsultingit.com">CCIT</a>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
