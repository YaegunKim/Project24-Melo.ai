'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { mapToTherapyParams } from '@melo/core';
import type { MoodType, GoalType } from '@melo/core';
import { useSessionStore } from '../../../../../store/sessionStore';
import { S } from './BioInput.style';

type Tab = 'manual' | 'camera' | 'wearable';

const MOODS: MoodType[] = ['anxious', 'tired', 'sad', 'neutral', 'happy', 'energetic'];
const GOALS: GoalType[] = ['relax', 'focus', 'sleep', 'energize', 'release'];

export function BioInput() {
  const t = useTranslations('input');
  const tGoals = useTranslations('goals');
  const tCommon = useTranslations('common');
  const tGenerate = useTranslations('generate');
  const locale = useLocale();
  const router = useRouter();

  const { setBioInput, setGoal, setTherapyParams } = useSessionStore();

  const [tab, setTab] = useState<Tab>('manual');
  const [heartRate, setHeartRate] = useState(72);
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(6);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [mood, setMood] = useState<MoodType>('neutral');
  const [goal, setSelectedGoal] = useState<GoalType | null>(null);

  const canGenerate = goal !== null;

  const handleGenerate = () => {
    if (!goal) return;

    const bioInput = { heartRate, stressLevel, sleepQuality, mood, energyLevel };
    const therapyParams = mapToTherapyParams(bioInput, goal);

    setBioInput(bioInput);
    setGoal(goal);
    setTherapyParams(therapyParams);

    router.push(`/${locale}/session/generating`);
  };

  return (
    <S.Page>
      <S.Header>
        <S.BackButton onClick={() => router.push(`/${locale}`)}>← {tCommon('back')}</S.BackButton>
        <div>
          <S.Title>{t('title')}</S.Title>
          <S.Subtitle>{t('subtitle')}</S.Subtitle>
        </div>
      </S.Header>

      <S.Content>
        <S.TabGroup>
          {(['manual', 'camera', 'wearable'] as Tab[]).map((key) => (
            <S.Tab key={key} $active={tab === key} onClick={() => setTab(key)}>
              {t(`tabs.${key}`)}
            </S.Tab>
          ))}
        </S.TabGroup>

        {tab === 'manual' && (
          <>
            <S.Section>
              <S.SectionTitle>{t('fields.heartRate')}</S.SectionTitle>

              <S.SliderRow>
                <S.SliderLabel>
                  <S.SliderName>{t('fields.heartRate')}</S.SliderName>
                  <S.SliderValue>{heartRate} BPM</S.SliderValue>
                </S.SliderLabel>
                <S.Slider
                  type="range" min={40} max={180} value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                />
              </S.SliderRow>

              <S.SliderRow>
                <S.SliderLabel>
                  <S.SliderName>{t('fields.stress')}</S.SliderName>
                  <S.SliderValue>{stressLevel} / 10</S.SliderValue>
                </S.SliderLabel>
                <S.Slider
                  type="range" min={1} max={10} value={stressLevel}
                  onChange={(e) => setStressLevel(Number(e.target.value))}
                />
              </S.SliderRow>

              <S.SliderRow>
                <S.SliderLabel>
                  <S.SliderName>{t('fields.sleep')}</S.SliderName>
                  <S.SliderValue>{sleepQuality} / 10</S.SliderValue>
                </S.SliderLabel>
                <S.Slider
                  type="range" min={1} max={10} value={sleepQuality}
                  onChange={(e) => setSleepQuality(Number(e.target.value))}
                />
              </S.SliderRow>

              <S.SliderRow>
                <S.SliderLabel>
                  <S.SliderName>{t('fields.energy')}</S.SliderName>
                  <S.SliderValue>{energyLevel} / 10</S.SliderValue>
                </S.SliderLabel>
                <S.Slider
                  type="range" min={1} max={10} value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                />
              </S.SliderRow>
            </S.Section>

            <S.Section>
              <S.SectionTitle>{t('fields.mood')}</S.SectionTitle>
              <S.MoodGrid>
                {MOODS.map((m) => (
                  <S.MoodButton
                    key={m}
                    $selected={mood === m}
                    onClick={() => setMood(m)}
                  >
                    {t(`moods.${m}`)}
                  </S.MoodButton>
                ))}
              </S.MoodGrid>
            </S.Section>
          </>
        )}

        {(tab === 'camera' || tab === 'wearable') && (
          <S.ComingSoon>
            <div style={{ fontSize: '3rem' }}>{tab === 'camera' ? '📷' : '⌚'}</div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                {t(`${tab}.title`)}
              </strong>
              <span style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                {t(`${tab}.description`)}
              </span>
            </div>
            <S.ComingSoonBadge>{t(`${tab}.comingSoon`)}</S.ComingSoonBadge>
          </S.ComingSoon>
        )}

        <S.Section>
          <S.SectionTitle>{tGoals('title')}</S.SectionTitle>
          <S.GoalsGrid>
            {GOALS.map((g) => (
              <S.GoalCard
                key={g}
                $selected={goal === g}
                onClick={() => setSelectedGoal(g)}
              >
                <S.GoalIcon>{tGoals(`${g}_icon`)}</S.GoalIcon>
                <S.GoalName>{tGoals(g)}</S.GoalName>
                <S.GoalDesc>{tGoals(`${g}_desc`)}</S.GoalDesc>
              </S.GoalCard>
            ))}
          </S.GoalsGrid>
        </S.Section>
      </S.Content>

      <S.Footer>
        <S.GenerateButton onClick={handleGenerate} disabled={!canGenerate}>
          {canGenerate ? `${tGenerate('button')} →` : `${tGoals('title')} 선택 필요`}
        </S.GenerateButton>
      </S.Footer>
    </S.Page>
  );
}
