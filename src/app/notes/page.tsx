import { PAGE_ROUTES } from '@/constants';
import CategoryList from '@/components/CategoryList';
import PageContainer from '@/components/PageContainer';

export default function NotesPage() {
  return (
    <PageContainer>
      <CategoryList pageId={PAGE_ROUTES.NOTES.id} title={PAGE_ROUTES.NOTES.title} />
    </PageContainer>
  );
}
