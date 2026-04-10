import { create } from 'zustand';
import type { BiologicalInput, GoalType, TherapyParams } from '@melo/core';

interface SessionState {
  bioInput: BiologicalInput | null;
  goal: GoalType | null;
  therapyParams: TherapyParams | null;
  audioUrl: string | null;
  setBioInput: (input: BiologicalInput) => void;
  setGoal: (goal: GoalType) => void;
  setTherapyParams: (params: TherapyParams) => void;
  setAudioUrl: (url: string) => void;
  reset: () => void;
}

const initial = {
  bioInput: null,
  goal: null,
  therapyParams: null,
  audioUrl: null,
};

export const useSessionStore = create<SessionState>((set) => ({
  ...initial,
  setBioInput: (bioInput) => set({ bioInput }),
  setGoal: (goal) => set({ goal }),
  setTherapyParams: (therapyParams) => set({ therapyParams }),
  setAudioUrl: (audioUrl) => set({ audioUrl }),
  reset: () => set(initial),
}));
