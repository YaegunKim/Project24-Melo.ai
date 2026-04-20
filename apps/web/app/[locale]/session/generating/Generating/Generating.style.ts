'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, typography } from '@percuro/design-system';

const wave = keyframes`
  0%, 100% { transform: scaleY(0.25); }
  50% { transform: scaleY(1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const S = {
  Page: styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${colors.bg.primary};
    color: ${colors.text.primary};
    font-family: ${typography.fontFamily.sans};
    padding: 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(155, 139, 244, 0.1) 0%, transparent 70%);
      pointer-events: none;
    }
  `,

  WaveContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 80px;
    margin-bottom: 3rem;
  `,

  WaveBar: styled.div<{ $delay: number }>`
    width: 5px;
    height: 100%;
    background: ${colors.brand.gradient};
    border-radius: 4px;
    transform-origin: center bottom;
    animation: ${wave} 1.4s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
  `,

  LoadingText: styled.h2`
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.bold};
    margin: 0 0 0.75rem;
    animation: ${pulse} 2s ease-in-out infinite;
    background: ${colors.brand.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,

  Subtitle: styled.p`
    font-size: ${typography.fontSize.base};
    color: ${colors.text.secondary};
    margin: 0 0 2.5rem;
  `,

  RationaleCard: styled.div`
    background: ${colors.bg.card};
    border: 1px solid ${colors.border.subtle};
    border-radius: 16px;
    padding: 1.5rem 2rem;
    max-width: 480px;
    animation: ${fadeIn} 0.5s ease 0.3s both;
  `,

  RationaleLabel: styled.div`
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.brand.secondary};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.625rem;
  `,

  RationaleText: styled.p`
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
    margin: 0;
  `,

  ParamsRow: styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  `,

  Param: styled.div`
    text-align: center;
  `,

  ParamValue: styled.div`
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.brand.primary};
  `,

  ParamLabel: styled.div`
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.muted};
    margin-top: 0.25rem;
  `,

  ProgressBar: styled.div`
    width: 100%;
    max-width: 480px;
    height: 6px;
    background: ${colors.bg.card};
    border-radius: 3px;
    overflow: hidden;
    margin: 0 0 1rem;
  `,

  ProgressFill: styled.div<{ $progress: number }>`
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: ${colors.brand.gradient};
    border-radius: 3px;
    transition: width 1s linear;
  `,

  EtaText: styled.p`
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.muted};
    margin: 0 0 2.5rem;
  `,

  ReadyText: styled.p`
    font-size: ${typography.fontSize.base};
    color: ${colors.brand.secondary};
    font-weight: ${typography.fontWeight.semibold};
    margin: 0 0 2.5rem;
    animation: ${pulse} 1.5s ease-in-out infinite;
  `,
};
