'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '../../../../../store/sessionStore';
import { useHistoryStore } from '../../../../../store/historyStore';
import { S } from './Player.style';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function Player() {
  const t = useTranslations('player');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const { audioUrl, therapyParams, bioInput, goal, reset } = useSessionStore();
  const { addSession } = useHistoryStore();

  const wavesurferRef = useRef<import('wavesurfer.js').default | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaveformReady, setIsWaveformReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!audioUrl || !therapyParams) {
      router.replace(`/${locale}/session/input`);
      return;
    }

    let destroyed = false;

    (async () => {
      const WaveSurfer = (await import('wavesurfer.js')).default;

      if (destroyed || !waveformRef.current) return;

      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#9B8BF4',
        progressColor: '#4ECDC4',
        url: audioUrl,
        height: 96,
        barWidth: 3,
        barGap: 2,
        barRadius: 3,
        normalize: true,
        interact: true,
      });

      if (destroyed) {
        ws.destroy();
        return;
      }

      ws.on('ready', () => {
        setDuration(ws.getDuration());
        setIsWaveformReady(true);
      });
      ws.on('audioprocess', (time) => setCurrentTime(time));
      ws.on('timeupdate', (time) => setCurrentTime(time));
      ws.on('play', () => setIsPlaying(true));
      ws.on('pause', () => setIsPlaying(false));
      ws.on('finish', () => setIsPlaying(false));

      wavesurferRef.current = ws;
    })();

    return () => {
      destroyed = true;
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, [audioUrl]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  const handleSave = () => {
    if (!audioUrl || !therapyParams || !bioInput || !goal) return;
    addSession({ audioUrl, therapyParams, bioInput, goal, rating: rating || undefined });
    setSaved(true);
  };

  const handleNewSession = () => {
    reset();
    router.push(`/${locale}/session/input`);
  };

  if (!therapyParams) return null;

  return (
    <S.Page>
      <S.Header>
        <S.BackButton onClick={() => router.push(`/${locale}`)}>← {tCommon('back')}</S.BackButton>
        <S.Title>{t('title')}</S.Title>
      </S.Header>

      <S.AlbumArt>🎵</S.AlbumArt>
      
      <S.TimeRow>
        <span>{formatTime(currentTime)}</span>
        <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
      </S.TimeRow>

      <S.WaveformWrapper>
        {!isWaveformReady && (
          <S.WaveformSkeleton>
            {Array.from({ length: 40 }, (_, i) => (
              <S.SkeletonBar key={i} $delay={(i * 0.05) % 1} $height={20 + Math.sin(i * 0.8) * 40 + 40} />
            ))}
          </S.WaveformSkeleton>
        )}
        <S.WaveformContainer ref={waveformRef} $visible={isWaveformReady} />
      </S.WaveformWrapper>

      <S.Controls>
        <S.PlayButton onClick={togglePlay} disabled={!isWaveformReady} aria-label={isPlaying ? t('pause') : t('play')}>
          {isPlaying ? '⏸' : '▶'}
        </S.PlayButton>
      </S.Controls>

      <S.TherapyCard>
        <S.TherapyTitle>🧠 {t('therapy_info')}</S.TherapyTitle>
        <S.TherapyGrid>
          <S.TherapyItem>
            <S.TherapyValue>{therapyParams.startBPM}</S.TherapyValue>
            <S.TherapyLabel>{t('bpm_start')}</S.TherapyLabel>
          </S.TherapyItem>
          <S.TherapyItem>
            <S.TherapyValue>{therapyParams.targetBPM}</S.TherapyValue>
            <S.TherapyLabel>{t('bpm_target')}</S.TherapyLabel>
          </S.TherapyItem>
          <S.TherapyItem>
            <S.TherapyValue>{therapyParams.key}</S.TherapyValue>
            <S.TherapyLabel>{t('key')}</S.TherapyLabel>
          </S.TherapyItem>
          <S.TherapyItem>
            <S.TherapyValue style={{ fontSize: '0.75rem' }}>{therapyParams.style.split(' ').slice(0, 2).join(' ')}</S.TherapyValue>
            <S.TherapyLabel>{t('style')}</S.TherapyLabel>
          </S.TherapyItem>
        </S.TherapyGrid>
      </S.TherapyCard>

      <S.RatingTitle>{t('rate_title')}</S.RatingTitle>
      <S.Stars>
        {[1, 2, 3, 4, 5].map((n) => (
          <S.Star key={n} $filled={n <= rating} onClick={() => setRating(n)}>
            {n <= rating ? '★' : '☆'}
          </S.Star>
        ))}
      </S.Stars>

      <S.Actions>
        <S.SaveButton onClick={handleSave} disabled={saved}>
          {saved ? '✓ 저장됨' : t('save')}
        </S.SaveButton>
        <S.NewSessionButton onClick={handleNewSession}>
          {t('new_session')}
        </S.NewSessionButton>
      </S.Actions>
    </S.Page>
  );
}
