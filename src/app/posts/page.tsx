import { PAGE_ROUTES } from '@/constants';
import CategoryList from '@/components/CategoryList';
import PageContainer from '@/components/PageContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts - 개발 포스트',
  description:
    '프론트엔드 개발 관련 포스트들을 모아놓은 페이지입니다. React, Next.js, TypeScript 등 다양한 개발 기술에 대한 글을 확인하세요.',
  keywords: ['개발 포스트', '프론트엔드', 'React', 'Next.js', 'TypeScript', 'JavaScript', '웹개발'],
  openGraph: {
    title: 'Posts - 개발 포스트 | JKyEun Blog',
    description:
      '프론트엔드 개발 관련 포스트들을 모아놓은 페이지입니다. React, Next.js, TypeScript 등 다양한 개발 기술에 대한 글을 확인하세요.',
    url: 'https://jkyeun.com/posts',
    siteName: 'JKyEun Blog',
    images: [{ url: 'https://jkyeun.com/images/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jkyeun.com/posts',
  },
};

export default function PostsPage() {
  return (
    <PageContainer>
      <CategoryList pageId={PAGE_ROUTES.POSTS.id} title={PAGE_ROUTES.POSTS.title} />
    </PageContainer>
  );
}
