import PageContainer from '@/components/PageContainer';
import { getPage } from '@/lib/notion';
import { formatDate } from '@/utils/date';
import { notFound } from 'next/navigation';
import InfiniteBlocks from '@/components/InfiniteBlocks';
import { getAllPosts } from '@/lib/notion';
import { PAGE_ROUTES } from '@/constants';

export const dynamic = 'force-static';

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

    const getTitle = () => {
      if (page.page.properties.title.type !== 'title') return null;
      return page.page.properties.title.title[0]?.plain_text;
    };

    return (
      <PageContainer>
        <header className="mb-8">
          <h1 className="flex justify-center text-4xl font-bold mb-4 text-gray-900">{getTitle()}</h1>
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
