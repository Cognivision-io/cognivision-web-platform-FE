import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Platform = 'swift' | 'kotlin' | 'react-native';

interface DocsState {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
}

export const useDocsStore = create<DocsState>()(
  persist(
    (set) => ({
      platform: 'react-native',
      setPlatform: (platform) => set({ platform }),
    }),
    {
      name: 'docs-storage',
    }
  )
);
