'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { buildMusicPrompt, generateMusic } from '@melo/core';
import { useSessionStore } from '../../../../../store/sessionStore';
import { S } from './Generating.style';

const WAVE_BARS = 18;

export function Generating() {
  const t = useTranslations('generate');
  const tPlayer = useTranslations('player');
  const locale = useLocale();
  const router = useRouter();

  const { therapyParams, setAudioUrl, goal } = useSessionStore();

  useEffect(() => {
    if (!therapyParams) {
      router.replace(`/${locale}/session/input`);
      return;
    }

    const prompt = buildMusicPrompt(therapyParams);

    generateMusic({ prompt, duration: therapyParams.duration, format: 'mp3' })
      .then((res) => {
        setAudioUrl(res.audioUrl);
        router.push(`/${locale}/session/player`);
      })
      .catch(() => {
        router.replace(`/${locale}/session/input`);
      });
  }, []);

  if (!therapyParams) return null;

  return (
    <S.Page>
      <S.WaveContainer>
        {Array.from({ length: WAVE_BARS }, (_, i) => (
          <S.WaveBar key={i} $delay={(i * 0.08) % 1.4} />
        ))}
      </S.WaveContainer>

      <S.LoadingText>{t('loading')}</S.LoadingText>
      <S.Subtitle>{t('subtitle')}</S.Subtitle>

      <S.RationaleCard>
        <S.RationaleLabel>💡 {t('rationale_label')}</S.RationaleLabel>
        <S.RationaleText>{therapyParams.rationale}</S.RationaleText>

        <S.ParamsRow>
          <S.Param>
            <S.ParamValue>{therapyParams.startBPM}</S.ParamValue>
            <S.ParamLabel>{tPlayer('bpm_start')}</S.ParamLabel>
          </S.Param>
          <S.Param>
            <S.ParamValue>→</S.ParamValue>
            <S.ParamLabel>&nbsp;</S.ParamLabel>
          </S.Param>
          <S.Param>
            <S.ParamValue>{therapyParams.targetBPM}</S.ParamValue>
            <S.ParamLabel>{tPlayer('bpm_target')}</S.ParamLabel>
          </S.Param>
        </S.ParamsRow>
      </S.RationaleCard>
    </S.Page>
  );
}
