import { PAGE_IDS } from '@/constants';
import CategoryList from '@/components/CategoryList';
import PageContainer from '@/components/PageContainer';

export default function NotesPage() {
  return (
    <PageContainer>
      <CategoryList pageId={PAGE_IDS.NOTES} />
    </PageContainer>
  );
}
