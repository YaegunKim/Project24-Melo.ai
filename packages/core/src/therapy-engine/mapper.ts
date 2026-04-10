import type { BiologicalInput, GoalType, MoodType, TherapyParams } from './types';

const GOAL_PROFILES: Record<
  GoalType,
  Omit<TherapyParams, 'startBPM' | 'isoPhase' | 'rationale'>
> = {
  relax:    { targetBPM: 60,  key: 'F major', mode: 'major', style: 'ambient piano with soft strings',       duration: 300 },
  focus:    { targetBPM: 80,  key: 'D major', mode: 'major', style: 'lo-fi electronic with light percussion', duration: 600 },
  sleep:    { targetBPM: 50,  key: 'C minor', mode: 'minor', style: 'soft ambient drone with gentle melody',  duration: 900 },
  energize: { targetBPM: 120, key: 'G major', mode: 'major', style: 'upbeat acoustic with rhythmic energy',   duration: 240 },
  release:  { targetBPM: 70,  key: 'A minor', mode: 'minor', style: 'expressive piano with space and silence', duration: 360 },
};

const MOOD_KEY_MAP: Record<MoodType, string> = {
  anxious:  'F major',
  tired:    'G major',
  sad:      'D minor',
  neutral:  'C major',
  happy:    'A major',
  energetic:'E major',
};

export function mapToTherapyParams(input: BiologicalInput, goal: GoalType): TherapyParams {
  const profile = GOAL_PROFILES[goal];

  // ISO Principle: 시작 BPM을 현재 심박수에 매칭
  const rawStart = Math.round(input.heartRate * (0.85 + input.stressLevel * 0.015));
  const startBPM = Math.min(Math.max(rawStart, 50), 140);

  const key = input.mood !== 'neutral' ? MOOD_KEY_MAP[input.mood] : profile.key;

  // 높은 스트레스 + 이완/해소 목표 → 단조로 감정 매칭 후 유도
  const mode =
    input.stressLevel >= 7 && (goal === 'relax' || goal === 'release')
      ? 'minor'
      : profile.mode;

  const rationale = `현재 심박수(${input.heartRate}BPM)에 맞춰 ${startBPM}BPM으로 시작하여 ${profile.targetBPM}BPM으로 유도합니다.`;

  return {
    ...profile,
    key,
    mode,
    startBPM,
    isoPhase: 'match',
    rationale,
  };
}
