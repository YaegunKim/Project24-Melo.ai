'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { GoalType } from '@melo/core';
import { useSessionStore } from '../../../../store/sessionStore';
import { useHistoryStore } from '../../../../store/historyStore';
import { S } from './History.style';

const GOAL_ICONS: Record<GoalType, string> = {
  relax: '🌊',
  focus: '🎯',
  sleep: '🌙',
  energize: '⚡',
  release: '🎭',
};

function formatDate(ts: number, locale: string) {
  return new Date(ts).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function History() {
  const t = useTranslations('history');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const { sessions } = useHistoryStore();
  const { setAudioUrl, setTherapyParams, setBioInput, setGoal } = useSessionStore();

  const handlePlayAgain = (session: (typeof sessions)[0]) => {
    setBioInput(session.bioInput);
    setGoal(session.goal);
    setTherapyParams(session.therapyParams);
    setAudioUrl(session.audioUrl);
    router.push(`/${locale}/session/player`);
  };

  return (
    <S.Page>
      <S.Header>
        <S.BackButton onClick={() => router.push(`/${locale}`)}>← {tCommon('back')}</S.BackButton>
        <S.Title>{t('title')}</S.Title>
      </S.Header>

      {sessions.length === 0 ? (
        <S.Empty>
          <S.EmptyIcon>🎵</S.EmptyIcon>
          <S.EmptyText>{t('empty')}</S.EmptyText>
          <S.EmptyDesc>{t('empty_desc')}</S.EmptyDesc>
          <S.StartButton onClick={() => router.push(`/${locale}/session/input`)}>
            {t('start_session')}
          </S.StartButton>
        </S.Empty>
      ) : (
        <S.SessionList>
          {sessions.map((session) => (
            <S.SessionCard key={session.id}>
              <S.GoalIcon>{GOAL_ICONS[session.goal]}</S.GoalIcon>
              <S.CardInfo>
                <S.CardTitle>{t(`goals.${session.goal}`)}</S.CardTitle>
                <S.CardMeta>
                  <span>{formatDate(session.createdAt, locale)}</span>
                  {session.rating && (
                    <S.Stars>{'★'.repeat(session.rating)}{'☆'.repeat(5 - session.rating)}</S.Stars>
                  )}
                  <span>{session.therapyParams.startBPM}→{session.therapyParams.targetBPM} BPM</span>
                </S.CardMeta>
              </S.CardInfo>
              <S.PlayAgainButton onClick={() => handlePlayAgain(session)}>
                ▶ {t('play_again')}
              </S.PlayAgainButton>
            </S.SessionCard>
          ))}
        </S.SessionList>
      )}
    </S.Page>
  );
}
