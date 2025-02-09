import { getAllPosts } from '@/lib/notion';
import PostCard from '@/components/PostCard';
import PageContainer from '@/components/PageContainer';
import Link from 'next/link';
import { IconGithub, IconLinkedin } from '@/icons';
import Image from 'next/image';
import { PAGE_ROUTES } from '@/constants';

export const dynamic = 'force-static';

export default async function MainPage() {
  const allPosts = await getAllPosts(PAGE_ROUTES.POSTS.id);

  return (
    <PageContainer>
      <section className="mb-16 flex justify-center items-center">
        <div className="flex gap-6 md:gap-8">
          <Image
            src="/images/jkyeun-profile.jpg"
            alt="프로필 사진"
            width={160}
            height={160}
            className="rounded-full w-32 h-32 md:w-40 md:h-40"
            priority
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">JKyEun</h1>
            <h2 className="text-lg md:text-2xl text-gray-600 mb-2 md:mb-4">Frontend Developer</h2>
            <p className="text-gray-700 mb-4">꾸준히 학습하고 이를 공유하기 위한 공간입니다.</p>
            <div className="flex gap-4">
              <Link href="https://github.com/jkyeun" target="_blank" rel="noopener noreferrer">
                <IconGithub className="hover:opacity-80 transition-opacity" />
              </Link>
              <Link href="https://www.linkedin.com/in/jkyeun" target="_blank" rel="noopener noreferrer">
                <IconLinkedin className="hover:opacity-80 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-8">
        {allPosts.map((post) => (
          <PostCard key={post.id} id={post.id} title={post.child_page?.title} createdTime={post.created_time} />
        ))}
      </div>
    </PageContainer>
  );
}
