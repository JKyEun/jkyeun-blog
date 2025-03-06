import PageContainer from '@/components/PageContainer';
import { getPage } from '@/lib/notion';
import { formatDate } from '@/utils/date';
import { notFound } from 'next/navigation';
import InfiniteBlocks from '@/components/InfiniteBlocks';
import { getAllPosts } from '@/lib/notion';
import { PAGE_ROUTES } from '@/constants';
import { Metadata } from 'next';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const getTitle = (page: PageObjectResponse) => {
  if (page.properties.title.type !== 'title') return null;
  return page.properties.title.title[0]?.plain_text;
};

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const page = await getPage(params.slug);
    const title = getTitle(page.page) || '';

    return {
      title: title,
      openGraph: {
        title: title,
        description: '프론트엔드 개발자 장경은의 블로그',
        type: 'article',
        url: `https://jkyeun.com/${params.slug}`,
        siteName: 'JKyEun Blog',
        images: [{ url: 'https://jkyeun.com/images/og-image.png', width: 1200, height: 630 }],
        locale: 'ko_KR',
      },
      alternates: {
        canonical: `https://jkyeun.com/${params.slug}`,
      },
    };
  } catch {
    return {
      title: '장경은 블로그',
    };
  }
}

export async function generateStaticParams() {
  const postsPages = await getAllPosts(PAGE_ROUTES.POSTS.id);
  const notesPages = await getAllPosts(PAGE_ROUTES.NOTES.id);

  return [...postsPages, ...notesPages].map((page) => ({
    slug: page.id,
  }));
}

export default async function SlugPage({ params }: { params: { slug: string } }) {
  try {
    const page = await getPage(params.slug);

    return (
      <PageContainer>
        <header className="mb-8">
          <h1 className="flex justify-center text-4xl font-bold mb-4 text-gray-900">{getTitle(page.page)}</h1>
          <hr className="border-gray-200" />
          <time className="flex justify-end mt-4 text-gray-600">{formatDate(page.page.created_time)}</time>
        </header>
        <InfiniteBlocks
          initialBlocks={page.blocks}
          pageId={params.slug}
          hasMore={page.has_more}
          initialCursor={page.next_cursor}
        />
      </PageContainer>
    );
  } catch {
    notFound();
  }
}
