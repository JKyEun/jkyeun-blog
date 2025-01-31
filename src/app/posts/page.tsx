import { PAGE_ROUTES } from '@/constants';
import CategoryList from '@/components/CategoryList';
import PageContainer from '@/components/PageContainer';

export default function PostsPage() {
  return (
    <PageContainer>
      <CategoryList pageId={PAGE_ROUTES.POSTS.id} title={PAGE_ROUTES.POSTS.title} />
    </PageContainer>
  );
}
