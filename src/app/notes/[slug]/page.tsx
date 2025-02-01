import PageContainer from '@/components/PageContainer';
import PostList from '@/components/PostList';

export default function NotesSlugPage({ params }: { params: { slug: string } }) {
  return (
    <PageContainer>
      <PostList pageId={params.slug} />
    </PageContainer>
  );
}
