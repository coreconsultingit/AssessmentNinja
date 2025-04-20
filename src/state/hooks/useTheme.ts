

// src/state/hooks/useTheme.ts
import { useAtom } from 'jotai';
import { themeAtom } from '../atoms/themeAtoms';

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return { theme, setTheme };
};