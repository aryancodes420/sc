'use client';
import { create } from 'zustand';
import type { Part, SectionId } from '@/lib/types';

interface BuildStore {
  activeSection: SectionId | null;
  selectedParts: Map<SectionId, Part>;
  setActiveSection: (section: SectionId | null) => void;
  selectPart: (part: Part) => void;
  removePart: (section: SectionId) => void;
  clearBuild: () => void;
  getTotalGBP: () => number;
  getSelectedPartsArray: () => Part[];
}

export const useBuildStore = create<BuildStore>()((set, get) => ({
  activeSection: 'front_aero',
  selectedParts: new Map(),

  setActiveSection: (section) => set({ activeSection: section }),

  selectPart: (part) =>
    set((state) => {
      const next = new Map(state.selectedParts);
      next.set(part.section, part);
      return { selectedParts: next };
    }),

  removePart: (section) =>
    set((state) => {
      const next = new Map(state.selectedParts);
      next.delete(section);
      return { selectedParts: next };
    }),

  clearBuild: () => set({ selectedParts: new Map() }),

  getTotalGBP: () => {
    let total = 0;
    get().selectedParts.forEach((part) => { total += part.price_gbp; });
    return total;
  },

  getSelectedPartsArray: () => Array.from(get().selectedParts.values()),
}));
