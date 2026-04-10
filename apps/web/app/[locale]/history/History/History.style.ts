'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, typography } from '@melo/design-system';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const S = {
  Page: styled.div`
    min-height: 100vh;
    background: ${colors.bg.primary};
    color: ${colors.text.primary};
    font-family: ${typography.fontFamily.sans};
    padding: 1.5rem;
    max-width: 640px;
    margin: 0 auto;
  `,

  Header: styled.header`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
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
    &:hover { color: ${colors.text.primary}; border-color: ${colors.brand.primary}; }
  `,

  Title: styled.h1`
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.bold};
    margin: 0;
  `,

  Empty: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 50vh;
    text-align: center;
    color: ${colors.text.muted};
  `,

  EmptyIcon: styled.div`
    font-size: 4rem;
    opacity: 0.5;
  `,

  EmptyText: styled.p`
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.text.secondary};
    margin: 0;
  `,

  EmptyDesc: styled.p`
    font-size: ${typography.fontSize.sm};
    margin: 0;
  `,

  StartButton: styled.button`
    margin-top: 0.5rem;
    padding: 0.75rem 2rem;
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.semibold};
    font-family: ${typography.fontFamily.sans};
    background: ${colors.brand.gradient};
    color: ${colors.text.inverse};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { opacity: 0.9; transform: translateY(-1px); }
  `,

  SessionList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  SessionCard: styled.div`
    background: ${colors.bg.card};
    border: 1px solid ${colors.border.subtle};
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    animation: ${fadeIn} 0.3s ease;
    transition: border-color 0.2s, transform 0.2s;

    &:hover {
      border-color: ${colors.border.default};
      transform: translateY(-2px);
    }
  `,

  GoalIcon: styled.div`
    font-size: 2.25rem;
    flex-shrink: 0;
  `,

  CardInfo: styled.div`
    flex: 1;
    min-width: 0;
  `,

  CardTitle: styled.div`
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.text.primary};
    margin-bottom: 0.25rem;
  `,

  CardMeta: styled.div`
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.muted};
    display: flex;
    align-items: center;
    gap: 0.625rem;
  `,

  Stars: styled.span`
    color: ${colors.brand.accent};
    letter-spacing: 1px;
  `,

  PlayAgainButton: styled.button`
    background: ${colors.bg.tertiary};
    border: 1px solid ${colors.border.default};
    border-radius: 10px;
    color: ${colors.text.secondary};
    cursor: pointer;
    padding: 0.5rem 0.875rem;
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.semibold};
    font-family: ${typography.fontFamily.sans};
    transition: all 0.2s;
    white-space: nowrap;
    &:hover { color: ${colors.text.primary}; border-color: ${colors.brand.primary}; }
  `,
};
