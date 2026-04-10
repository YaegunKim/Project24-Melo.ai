'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { S } from './Landing.style';

const FEATURES = [
  { key: 'bio', icon: '🫀' },
  { key: 'therapy', icon: '🎵' },
  { key: 'ai', icon: '🤖' },
] as const;

export function Landing() {
  const t = useTranslations('landing');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: 'ko' | 'en') => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  return (
    <S.Page>
      <S.Nav>
        <S.NavLogo>Melo.ai</S.NavLogo>
        <S.NavActions>
          <S.NavLink onClick={() => router.push(`/${locale}/history`)}>
            {tNav('history')}
          </S.NavLink>
          <S.LocaleButton $active={locale === 'ko'} onClick={() => switchLocale('ko')}>
            KO
          </S.LocaleButton>
          <S.LocaleButton $active={locale === 'en'} onClick={() => switchLocale('en')}>
            EN
          </S.LocaleButton>
        </S.NavActions>
      </S.Nav>

      <S.Hero>
        <S.HeroIcon>🎶</S.HeroIcon>
        <S.HeroTitle>{t('title')}</S.HeroTitle>
        <S.HeroTagline>{t('tagline')}</S.HeroTagline>
        <S.HeroDescription>{t('description')}</S.HeroDescription>
        <S.HeroCtaWrapper>
          <S.CtaButton onClick={() => router.push(`/${locale}/session/input`)}>
            {t('cta')} →
          </S.CtaButton>
        </S.HeroCtaWrapper>
      </S.Hero>

      <S.Features>
        <S.FeaturesGrid>
          {FEATURES.map(({ key, icon }) => (
            <S.FeatureCard key={key}>
              <S.FeatureIcon>{icon}</S.FeatureIcon>
              <S.FeatureTitle>{t(`features.${key}.title`)}</S.FeatureTitle>
              <S.FeatureDescription>{t(`features.${key}.description`)}</S.FeatureDescription>
            </S.FeatureCard>
          ))}
        </S.FeaturesGrid>
      </S.Features>
    </S.Page>
  );
}
