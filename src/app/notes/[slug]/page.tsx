import PageContainer from '@/components/PageContainer';
import PostList from '@/components/PostList';
import { PAGE_ROUTES } from '@/constants';
import { getPage } from '@/lib/notion';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const page = await getPage(PAGE_ROUTES.NOTES.id);
  const categories = page.blocks.filter((block) => block.type === 'child_page');

  return categories.map((category) => ({
    slug: category.id,
  }));
}

export default function NotesSlugPage({ params }: { params: { slug: string } }) {
  return (
    <PageContainer>
      <PostList pageId={params.slug} />
    </PageContainer>
  );
}
