import type { Metadata } from 'next';
import { EmotionRegistry } from './EmotionRegistry';

export const metadata: Metadata = {
  title: {
    default: 'Melo.ai',
    template: '%s | Melo.ai',
  },
  description: '생체 데이터 기반 AI 음악치료 서비스',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
