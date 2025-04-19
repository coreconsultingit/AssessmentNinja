import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#212121', color: '#d3d3d3', textAlign: 'center', padding: '10px 20px' }}>
      <p>
        &copy; 2025 Powered By{' '}
        <a href="https://coreconsultingit.com" style={{ color: '#d3d3d3', textDecoration: 'none' }}>
          CCIT
        </a>
        . All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
