import { PAGE_ROUTES } from '@/constants';
import CategoryList from '@/components/CategoryList';
import PageContainer from '@/components/PageContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes - 개발 노트',
  description: '개발 과정에서 배운 것들과 짧은 노트들을 정리한 페이지입니다. 실무 경험과 학습 내용을 공유합니다.',
  keywords: ['개발 노트', '학습 노트', '프론트엔드', '개발 경험', '실무 노하우', '기술 노트'],
  openGraph: {
    title: 'Notes - 개발 노트 | JKyEun Blog',
    description: '개발 과정에서 배운 것들과 짧은 노트들을 정리한 페이지입니다. 실무 경험과 학습 내용을 공유합니다.',
    url: 'https://jkyeun.com/notes',
    siteName: 'JKyEun Blog',
    images: [{ url: 'https://jkyeun.com/images/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jkyeun.com/notes',
  },
};

export default function NotesPage() {
  return (
    <PageContainer>
      <CategoryList pageId={PAGE_ROUTES.NOTES.id} title={PAGE_ROUTES.NOTES.title} />
    </PageContainer>
  );
}
