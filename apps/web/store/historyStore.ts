import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BiologicalInput, GoalType, TherapyParams } from '@melo/core';

export interface SessionRecord {
  id: string;
  createdAt: number;
  bioInput: BiologicalInput;
  goal: GoalType;
  therapyParams: TherapyParams;
  audioUrl: string;
  rating?: number;
}

interface HistoryState {
  sessions: SessionRecord[];
  addSession: (data: Omit<SessionRecord, 'id' | 'createdAt'>) => SessionRecord;
  rateSession: (id: string, rating: number) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      sessions: [],
      addSession: (data) => {
        const session: SessionRecord = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        };
        set({ sessions: [session, ...get().sessions] });
        return session;
      },
      rateSession: (id, rating) => {
        set({
          sessions: get().sessions.map((s) => (s.id === id ? { ...s, rating } : s)),
        });
      },
      clearHistory: () => set({ sessions: [] }),
    }),
    { name: 'melo-history' }
  )
);
