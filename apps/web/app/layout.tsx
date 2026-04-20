import type { Metadata } from 'next';
import { EmotionRegistry } from './EmotionRegistry';

export const metadata: Metadata = {
  title: {
    default: 'Percuro.ai',
    template: '%s | Percuro.ai',
  },
  description: '생체 데이터 기반 AI 음악치료 서비스',
  keywords: ['음악치료', 'AI', '생체데이터', 'Percuro.ai', '힐링', '웰니스'],
  authors: [{ name: 'Percuro.ai' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎵</text></svg>"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
