'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, typography, media } from '@melo/design-system';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const S = {
  Page: styled.div`
    min-height: 100vh;
    background: ${colors.bg.primary};
    color: ${colors.text.primary};
    font-family: ${typography.fontFamily.sans};
  `,

  Nav: styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: rgba(7, 7, 15, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${colors.border.subtle};
  `,

  NavLogo: styled.span`
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.bold};
    background: ${colors.brand.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,

  NavActions: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `,

  LocaleButton: styled.button<{ $active: boolean }>`
    background: ${({ $active }) => ($active ? colors.bg.card : 'transparent')};
    color: ${({ $active }) => ($active ? colors.text.primary : colors.text.muted)};
    border: 1px solid ${({ $active }) => ($active ? colors.border.default : 'transparent')};
    border-radius: 8px;
    padding: 0.375rem 0.75rem;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s;
    font-family: ${typography.fontFamily.sans};
    &:hover {
      color: ${colors.text.primary};
      background: ${colors.bg.card};
    }
  `,

  Hero: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 6rem 2rem 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(155, 139, 244, 0.12) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 40% at 20% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 60%);
      pointer-events: none;
    }
  `,

  HeroIcon: styled.div`
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: ${float} 4s ease-in-out infinite;
  `,

  HeroTitle: styled.h1`
    font-size: clamp(${typography.fontSize['4xl']}, 8vw, ${typography.fontSize['6xl']});
    font-weight: ${typography.fontWeight.extrabold};
    margin: 0 0 0.5rem;
    background: ${colors.brand.gradient};
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${gradientShift} 4s ease infinite;
    line-height: ${typography.lineHeight.tight};
  `,

  HeroTagline: styled.p`
    font-size: clamp(${typography.fontSize.xl}, 3vw, ${typography.fontSize['3xl']});
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.text.primary};
    margin: 0 0 1.25rem;
    animation: ${fadeUp} 0.6s ease 0.1s both;
  `,

  HeroDescription: styled.p`
    font-size: ${typography.fontSize.lg};
    color: ${colors.text.secondary};
    max-width: 480px;
    line-height: ${typography.lineHeight.relaxed};
    margin: 0 0 2.5rem;
    white-space: pre-line;
    animation: ${fadeUp} 0.6s ease 0.2s both;
  `,

  HeroCtaWrapper: styled.div`
    animation: ${fadeUp} 0.6s ease 0.3s both;
  `,

  CtaButton: styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    padding: 1rem 2.5rem;
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.bold};
    font-family: ${typography.fontFamily.sans};
    background: ${colors.brand.gradient};
    color: ${colors.text.inverse};
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 24px rgba(155, 139, 244, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(155, 139, 244, 0.45);
    }
    &:active {
      transform: translateY(0);
    }
  `,

  Features: styled.section`
    padding: 5rem 2rem;
    max-width: 1000px;
    margin: 0 auto;
  `,

  FeaturesGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    ${media.md} {
      grid-template-columns: repeat(3, 1fr);
    }
  `,

  FeatureCard: styled.div`
    background: ${colors.bg.card};
    border: 1px solid ${colors.border.subtle};
    border-radius: 20px;
    padding: 2rem;
    transition: border-color 0.2s, transform 0.2s;

    &:hover {
      border-color: ${colors.border.default};
      transform: translateY(-4px);
    }
  `,

  FeatureIcon: styled.div`
    font-size: 2.5rem;
    margin-bottom: 1rem;
  `,

  FeatureTitle: styled.h3`
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.text.primary};
    margin: 0 0 0.5rem;
  `,

  FeatureDescription: styled.p`
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
    margin: 0;
  `,

  NavLink: styled.a`
    color: ${colors.text.secondary};
    text-decoration: none;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    transition: color 0.2s;
    cursor: pointer;
    &:hover { color: ${colors.text.primary}; }
  `,
};
