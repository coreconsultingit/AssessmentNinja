// src/state/atoms/themeAtoms.ts
import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atomWithStorage('theme', 'zinc');