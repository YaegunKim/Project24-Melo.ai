'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, typography, media } from '@melo/design-system';

const shimmer = keyframes`
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
  50% { opacity: 0.7; transform: scaleY(1); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const S = {
  Page: styled.div`
    min-height: 100vh;
    background: ${colors.bg.primary};
    color: ${colors.text.primary};
    font-family: ${typography.fontFamily.sans};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    max-width: 640px;
    margin: 0 auto;
    animation: ${fadeUp} 0.4s ease;
  `,

  Header: styled.header`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
  `,

  BackButton: styled.button`
    background: ${colors.bg.card};
    border: 1px solid ${colors.border.default};
    border-radius: 10px;
    color: ${colors.text.secondary};
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    font-size: ${typography.fontSize.sm};
    font-family: ${typography.fontFamily.sans};
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
    &:hover { color: ${colors.text.primary}; border-color: ${colors.brand.primary}; }
  `,

  Title: styled.h1`
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.bold};
    margin: 0;
  `,

  AlbumArt: styled.div`
    width: 88px;
    height: 88px;
    border-radius: 16px;
    background: linear-gradient(135deg, #1C1C35 0%, #2A1A4A 40%, #1A2A4A 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin: 0 auto 1.5rem;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(155, 139, 244, 0.25);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: ${colors.brand.gradient};
      opacity: 0.08;
    }
  `,

  WaveformWrapper: styled.div`
    position: relative;
    margin-bottom: 1.5rem;
    background: ${colors.bg.card};
    border-radius: 16px;
    border: 1px solid ${colors.border.subtle};
    overflow: hidden;
    min-height: 128px;
    display: flex;
    align-items: center;
  `,

  WaveformContainer: styled.div<{ $visible: boolean }>`
    width: 100%;
    padding: 1rem 1.25rem;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.4s ease;
  `,

  WaveformSkeleton: styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 1rem 1.25rem;
  `,

  SkeletonBar: styled.div<{ $delay: number; $height: number }>`
    flex: 1;
    height: ${({ $height }) => $height}%;
    max-height: 80%;
    background: ${colors.border.subtle};
    border-radius: 2px;
    animation: ${shimmer} 1.6s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
  `,

  Controls: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 0.75rem;
  `,

  PlayButton: styled.button`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: ${colors.brand.gradient};
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    box-shadow: 0 4px 20px rgba(155, 139, 244, 0.4);

    &:hover { transform: scale(1.05); box-shadow: 0 6px 28px rgba(155, 139, 244, 0.5); }
    &:active { transform: scale(0.97); }
  `,

  TimeRow: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.muted};
    margin-bottom: 0.5rem;
    padding: 0 0.25rem;
  `,

  TherapyCard: styled.div`
    background: ${colors.bg.card};
    border: 1px solid ${colors.border.subtle};
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
  `,

  TherapyTitle: styled.div`
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.brand.secondary};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.875rem;
  `,

  TherapyGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;

    ${media.sm} {
      grid-template-columns: repeat(4, 1fr);
    }
  `,

  TherapyItem: styled.div`
    text-align: center;
  `,

  TherapyValue: styled.div`
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text.primary};
  `,

  TherapyLabel: styled.div`
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.muted};
    margin-top: 0.2rem;
  `,

  RatingTitle: styled.div`
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.secondary};
    text-align: center;
    margin-bottom: 0.75rem;
  `,

  Stars: styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  `,

  Star: styled.button<{ $filled: boolean }>`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.15s;
    color: ${({ $filled }) => ($filled ? colors.brand.accent : colors.border.default)};
    &:hover { transform: scale(1.2); }
  `,

  Actions: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,

  SaveButton: styled.button`
    padding: 0.875rem;
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.semibold};
    font-family: ${typography.fontFamily.sans};
    background: ${colors.brand.gradient};
    color: ${colors.text.inverse};
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { opacity: 0.9; transform: translateY(-1px); }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  `,

  NewSessionButton: styled.button`
    padding: 0.875rem;
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.semibold};
    font-family: ${typography.fontFamily.sans};
    background: transparent;
    color: ${colors.text.secondary};
    border: 1px solid ${colors.border.default};
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { color: ${colors.text.primary}; border-color: ${colors.brand.primary}; }
  `,
};
