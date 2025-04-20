// src/components/ThemeProvider.tsx
import React from 'react';
import { useTheme } from '../state/hooks/useTheme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`theme-${theme}`}>
      {children}
    </div>
  );
};