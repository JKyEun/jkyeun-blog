import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'JKyEun Blog',
  description: '프론트엔드 개발자 장경은의 블로그입니다.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
