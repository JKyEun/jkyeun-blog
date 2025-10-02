import PageContainer from '@/components/PageContainer';
import { getPage, extractPreviewText } from '@/lib/notion';
import { formatDate } from '@/utils/date';
import { notFound } from 'next/navigation';
import InfiniteBlocks from '@/components/InfiniteBlocks';
import { getAllPosts } from '@/lib/notion';
import { PAGE_ROUTES } from '@/constants';
import { Metadata } from 'next';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import JsonLd from '@/components/JsonLd';

const getTitle = (page: PageObjectResponse) => {
  if (page.properties.title.type !== 'title') return null;
  return page.properties.title.title[0]?.plain_text;
};

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const page = await getPage(params.slug);
    const title = getTitle(page.page) || '';
    const description = extractPreviewText(page.blocks) || '프론트엔드 개발자 장경은의 블로그 포스트입니다.';
    const publishedTime = new Date(page.page.created_time).toISOString();
    const modifiedTime = new Date(page.page.last_edited_time).toISOString();

    return {
      title: title,
      description: description,
      keywords: ['프론트엔드', '개발', '블로그', '장경은', 'JKyEun', title],
      openGraph: {
        title: title,
        description: description,
        type: 'article',
        url: `https://jkyeun.com/${params.slug}`,
        siteName: 'JKyEun Blog',
        images: [{ url: 'https://jkyeun.com/images/og-image.png', width: 1200, height: 630 }],
        locale: 'ko_KR',
        publishedTime: publishedTime,
        modifiedTime: modifiedTime,
        authors: ['장경은'],
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: ['https://jkyeun.com/images/og-image.png'],
      },
      alternates: {
        canonical: `https://jkyeun.com/${params.slug}`,
      },
    };
  } catch {
    return {
      title: '장경은 블로그',
      description: '프론트엔드 개발자 장경은의 블로그',
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
    const title = getTitle(page.page) || '';
    const description = extractPreviewText(page.blocks) || '프론트엔드 개발자 장경은의 블로그 포스트입니다.';
    const publishedTime = new Date(page.page.created_time).toISOString();
    const modifiedTime = new Date(page.page.last_edited_time).toISOString();

    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      author: {
        '@type': 'Person',
        name: '장경은',
        url: 'https://jkyeun.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'JKyEun Blog',
        url: 'https://jkyeun.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://jkyeun.com/images/og-image.png',
        },
      },
      datePublished: publishedTime,
      dateModified: modifiedTime,
      url: `https://jkyeun.com/${params.slug}`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://jkyeun.com/${params.slug}`,
      },
    };

    return (
      <>
        <JsonLd data={articleJsonLd} />
        <PageContainer>
          <header className="mb-8">
            <h1 className="flex justify-center text-4xl font-bold mb-4 text-gray-900">{title}</h1>
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
      </>
    );
  } catch {
    notFound();
  }
}
