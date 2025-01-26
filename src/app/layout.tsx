import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { getPage } from '@/lib/notion';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const metadata: Metadata = {
  title: 'JKyEun Blog',
  description: '프론트엔드 개발자 장경은의 블로그입니다.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getPage();
  const menus = pages.blocks.filter(
    (block): block is Extract<BlockObjectResponse, { type: 'child_page' }> => block.type === 'child_page',
  );

  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
        <Navigation menus={menus} />
        {children}
      </body>
    </html>
  );
}
