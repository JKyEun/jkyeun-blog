import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnalyticsScript from '@/components/AnalyticsScript';

export const metadata: Metadata = {
  title: {
    template: '%s | JKyEun Blog',
    default: 'JKyEun Blog',
  },
  icons: {
    icon: '/icon.ico',
  },
  description: '프론트엔드 개발자 장경은의 블로그입니다.',
  keywords: ['프론트엔드', '개발', '블로그', '장경은', '장경은 블로그', 'JKyEun', 'JKyEun Blog'],
  openGraph: {
    title: 'JKyEun Blog',
    description: '프론트엔드 개발자 장경은의 블로그입니다.',
    url: 'https://jkyeun.com',
    siteName: 'JKyEun Blog',
    images: [{ url: 'https://jkyeun.com/images/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jkyeun.com',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <AnalyticsScript />
      <body className="min-h-screen bg-white">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
