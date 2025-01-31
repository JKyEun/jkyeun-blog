import Block from '@/components/Block';
import PageContainer from '@/components/PageContainer';
import { EnrichedBlockObjectResponse, getPage } from '@/lib/notion';
import { notFound } from 'next/navigation';

export default async function SlugPage({ params }: { params: { slug: string } }) {
  // TODO: PostList 컴포넌트 만들어서 분리하기
  try {
    const page = await getPage(params.slug);

    const getTitle = () => {
      if (page.page.properties.title.type !== 'title') return null;
      return page.page.properties.title.title[0]?.plain_text;
    };

    return (
      // TODO: 조금 더 게시글 상세페이지 같은 모습으로 수정하기
      <PageContainer>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">{getTitle()}</h1>
        <div className="space-y-4">
          {page.blocks.map((block: EnrichedBlockObjectResponse) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      </PageContainer>
    );
  } catch {
    notFound();
  }
}
