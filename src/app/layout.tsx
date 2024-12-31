import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { getPage } from '@/lib/notion';

export const metadata: Metadata = {
  title: 'JKyEun Blog',
  description: 'JKyEun Blog',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = await getPage();
  const childPages = page.blocks
    .filter((block: any) => block.type === 'child_page')
    .map((block: any) => ({
      id: block.id,
      title: block.child_page.title,
    }));

  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
        <Navigation pages={childPages} />
        <div className="ml-64">
          <div className="max-w-[980px] mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
