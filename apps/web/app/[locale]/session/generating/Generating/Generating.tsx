'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { buildMusicPrompt, generateMusic } from '@percuro/core';
import { useSessionStore } from '../../../../../store/sessionStore';
import { S } from './Generating.style';

const WAVE_BARS = 18;

export function Generating() {
  const t = useTranslations('generate');
  const tPlayer = useTranslations('player');
  const locale = useLocale();
  const router = useRouter();

  const { therapyParams, setAudioUrl, goal } = useSessionStore();
  const hasStarted = useRef(false);

  const [etaTotal, setEtaTotal] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // ETA 카운트다운 인터벌
  useEffect(() => {
    if (etaTotal === null) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= etaTotal) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [etaTotal]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (!therapyParams) {
      router.replace(`/${locale}/session/input`);
      return;
    }

    const prompt = buildMusicPrompt(therapyParams);

    generateMusic(
      { prompt, duration: therapyParams.duration, format: 'mp3' },
      (eta) => setEtaTotal(eta * 2),
    )
      .then((res) => {
        setAudioUrl(res.audioUrl);
        router.push(`/${locale}/session/player`);
      })
      .catch(() => {
        router.replace(`/${locale}/session/input`);
      });
  }, []);

  if (!therapyParams) return null;

  const progress = etaTotal !== null ? Math.min((elapsed / etaTotal) * 100, 100) : 0;
  const isReady = etaTotal !== null && elapsed >= etaTotal;
  const remaining = etaTotal !== null ? Math.max(etaTotal - elapsed, 0) : null;

  return (
    <S.Page>
      <S.WaveContainer>
        {Array.from({ length: WAVE_BARS }, (_, i) => (
          <S.WaveBar key={i} $delay={(i * 0.08) % 1.4} />
        ))}
      </S.WaveContainer>

      <S.LoadingText>{t('loading')}</S.LoadingText>

      {isReady ? (
        <S.ReadyText>음악이 생성되었습니다! 잠시만 기다려주세요!</S.ReadyText>
      ) : etaTotal !== null ? (
        <>
          <S.ProgressBar>
            <S.ProgressFill $progress={progress} />
          </S.ProgressBar>
          <S.EtaText>약 {remaining}초 후에 완성됩니다</S.EtaText>
        </>
      ) : (
        <S.Subtitle>{t('subtitle')}</S.Subtitle>
      )}

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
