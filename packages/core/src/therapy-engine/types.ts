export type MoodType = 'anxious' | 'tired' | 'sad' | 'neutral' | 'happy' | 'energetic';
export type GoalType = 'relax' | 'focus' | 'sleep' | 'energize' | 'release';

export interface BiologicalInput {
  heartRate: number;    // BPM 40–180
  stressLevel: number;  // 1–10
  sleepQuality: number; // 1–10
  mood: MoodType;
  energyLevel: number;  // 1–10
}

export interface TherapyParams {
  startBPM: number;
  targetBPM: number;
  key: string;
  mode: 'major' | 'minor';
  style: string;
  duration: number;      // seconds
  isoPhase: 'match' | 'guide';
  rationale: string;
}
