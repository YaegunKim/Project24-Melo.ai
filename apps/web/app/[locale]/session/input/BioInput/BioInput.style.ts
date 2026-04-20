'use client';

import styled from '@emotion/styled';
import { colors, typography, media } from '@percuro/design-system';

export const S = {
  Page: styled.div`
    min-height: 100vh;
    background: ${colors.bg.primary};
    color: ${colors.text.primary};
    font-family: ${typography.fontFamily.sans};
    padding: 1.5rem 1.5rem 6rem;

    ${media.md} {
      padding: 2rem 2rem 4rem;
    }
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
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.2s;
    &:hover { color: ${colors.text.primary}; border-color: ${colors.brand.primary}; }
  `,

  Title: styled.h1`
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.bold};
    margin: 0;
    color: ${colors.text.primary};
  `,

  Subtitle: styled.p`
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.muted};
    margin: 0.25rem 0 0;
  `,

  Content: styled.div`
    max-width: 600px;
    margin: 0 auto;
  `,

  TabGroup: styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    background: ${colors.bg.card};
    border-radius: 12px;
    padding: 0.375rem;
  `,

  Tab: styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 0.625rem;
    border: none;
    border-radius: 8px;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    font-family: ${typography.fontFamily.sans};
    cursor: pointer;
    transition: all 0.2s;
    background: ${({ $active }) => ($active ? colors.bg.tertiary : 'transparent')};
    color: ${({ $active }) => ($active ? colors.text.primary : colors.text.muted)};
    &:hover { color: ${colors.text.primary}; }
  `,

  Section: styled.div`
    margin-bottom: 2rem;
  `,

  SectionTitle: styled.h2`
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.text.secondary};
    margin: 0 0 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: ${typography.fontSize.xs};
  `,

  SliderRow: styled.div`
    margin-bottom: 1.5rem;
  `,

  SliderLabel: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  `,

  SliderName: styled.span`
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.text.primary};
  `,

  SliderValue: styled.span`
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.brand.primary};
    min-width: 2.5rem;
    text-align: right;
  `,

  Slider: styled.input`
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: ${colors.border.default};
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${colors.brand.gradient};
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(155, 139, 244, 0.4);
    }
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${colors.brand.primary};
      cursor: pointer;
      border: none;
    }
  `,

  MoodGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;

    ${media.sm} {
      grid-template-columns: repeat(6, 1fr);
    }
  `,

  MoodButton: styled.button<{ $selected: boolean }>`
    padding: 0.625rem 0.25rem;
    border-radius: 12px;
    border: 1px solid ${({ $selected }) => ($selected ? colors.brand.primary : colors.border.subtle)};
    background: ${({ $selected }) => ($selected ? `${colors.brand.primary}22` : colors.bg.card)};
    color: ${({ $selected }) => ($selected ? colors.text.primary : colors.text.secondary)};
    font-size: ${typography.fontSize.xs};
    font-family: ${typography.fontFamily.sans};
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;

    &:hover { border-color: ${colors.brand.primary}; }
  `,

  GoalsGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;

    ${media.sm} {
      grid-template-columns: repeat(5, 1fr);
    }
  `,

  GoalCardWrap: styled.div`
    position: relative;
  `,

  GoalCard: styled.button<{ $selected: boolean }>`
    width: 100%;
    padding: 1.25rem 0.75rem;
    border-radius: 16px;
    border: 1.5px solid ${({ $selected }) => ($selected ? colors.brand.primary : colors.border.subtle)};
    background: ${({ $selected }) => ($selected ? `${colors.brand.primary}18` : colors.bg.card)};
    color: ${({ $selected }) => ($selected ? colors.text.primary : colors.text.secondary)};
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    font-family: ${typography.fontFamily.sans};

    &:hover { border-color: ${colors.brand.primary}; transform: translateY(-2px); }
  `,

  GoalInfoButton: styled.button`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 1.5px solid ${colors.border.default};
    background: ${colors.bg.secondary};
    color: ${colors.text.muted};
    font-size: 0.65rem;
    font-weight: ${typography.fontWeight.bold};
    font-family: ${typography.fontFamily.sans};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: all 0.15s;
    z-index: 1;

    &:hover {
      border-color: ${colors.brand.primary};
      color: ${colors.brand.primary};
      background: ${colors.bg.card};
    }
  `,

  GoalTooltip: styled.div<{ $align: 'left' | 'center' | 'right' }>`
    position: absolute;
    bottom: calc(100% + 8px);
    width: 200px;
    ${({ $align }) =>
      $align === 'left'
        ? 'left: 0;'
        : $align === 'right'
          ? 'right: 0;'
          : 'left: 50%; transform: translateX(-50%);'}
    background: ${colors.bg.tertiary};
    border: 1px solid ${colors.border.default};
    border-radius: 12px;
    padding: 0.75rem;
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.secondary};
    line-height: 1.6;
    z-index: 10;
    pointer-events: none;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      ${({ $align }) =>
        $align === 'left'
          ? 'left: 16px;'
          : $align === 'right'
            ? 'right: 16px;'
            : 'left: 50%; transform: translateX(-50%);'}
      border: 5px solid transparent;
      border-top-color: ${colors.border.default};
    }
  `,

  GoalIcon: styled.div`
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  `,

  GoalName: styled.div`
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
  `,

  GoalDesc: styled.div`
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.muted};
    margin-top: 0.25rem;
  `,

  ComingSoon: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 2rem;
    background: ${colors.bg.card};
    border-radius: 16px;
    border: 1px dashed ${colors.border.default};
    color: ${colors.text.muted};
    text-align: center;
  `,

  ComingSoonBadge: styled.span`
    background: ${colors.bg.tertiary};
    border: 1px solid ${colors.border.default};
    color: ${colors.text.muted};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.semibold};
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  `,

  Footer: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 1.5rem;
    background: rgba(7, 7, 15, 0.95);
    backdrop-filter: blur(12px);
    border-top: 1px solid ${colors.border.subtle};
  `,

  GenerateButton: styled.button`
    width: 100%;
    max-width: 600px;
    display: block;
    margin: 0 auto;
    padding: 1rem;
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.bold};
    font-family: ${typography.fontFamily.sans};
    background: ${colors.brand.gradient};
    color: ${colors.text.inverse};
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 4px 20px rgba(155, 139, 244, 0.3);

    &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(155, 139, 244, 0.45); }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  `,
};
