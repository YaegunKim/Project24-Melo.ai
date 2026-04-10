'use client';

import styled from '@emotion/styled';
import { colors } from '../../colors';
import { typography } from '../../typography';

export const S = {
  Button: styled.button<{
    $variant?: 'primary' | 'secondary' | 'ghost';
    $size?: 'sm' | 'md' | 'lg';
  }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-family: ${typography.fontFamily.sans};
    font-weight: ${typography.fontWeight.semibold};
    transition: all 0.2s ease;
    white-space: nowrap;

    ${({ $size = 'md' }) =>
      $size === 'sm'
        ? `padding: 0.5rem 1rem; font-size: ${typography.fontSize.sm};`
        : $size === 'lg'
        ? `padding: 1rem 2rem; font-size: ${typography.fontSize.lg};`
        : `padding: 0.75rem 1.5rem; font-size: ${typography.fontSize.base};`}

    ${({ $variant = 'primary' }) =>
      $variant === 'primary'
        ? `
          background: ${colors.brand.gradient};
          color: ${colors.text.inverse};
          &:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(155, 139, 244, 0.35); }
          &:active { transform: translateY(0); }
        `
        : $variant === 'secondary'
        ? `
          background: ${colors.bg.card};
          color: ${colors.text.primary};
          border: 1px solid ${colors.border.default};
          &:hover { border-color: ${colors.brand.primary}; background: ${colors.bg.hover}; }
        `
        : `
          background: transparent;
          color: ${colors.text.secondary};
          &:hover { color: ${colors.text.primary}; background: ${colors.bg.card}; }
        `}

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
  `,
};
