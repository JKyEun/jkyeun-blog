import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JKyEun Blog',
  description: 'JKyEun Blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
