import { getPage } from '@/lib/notion';
import PostCard from '@/components/PostCard';
import PageContainer from '@/components/PageContainer';

export default async function MainPage() {
  const pages = await getPage('187ee792-570f-8026-b379-d08f35d30859');
  const posts = pages.blocks.filter((block) => block.type === 'child_page');
  const validPosts = posts
    .filter((post): post is Extract<typeof post, { type: 'child_page' }> => post?.type === 'child_page')
    .sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold mb-12 text-gray-800">Recent Posts</h1>
      <div className="space-y-8">
        {validPosts.map((post) => (
          <PostCard key={post.id} id={post.id} title={post.child_page?.title} createdTime={post.created_time} />
        ))}
      </div>
    </PageContainer>
  );
}
