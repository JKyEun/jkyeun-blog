import type { Metadata } from 'next';
import './globals.css';
import GNB from '@/components/GNB';

export const metadata: Metadata = {
  title: 'Base Template',
  description: 'Base Template for Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <GNB />
        {children}
      </body>
    </html>
  );
}
