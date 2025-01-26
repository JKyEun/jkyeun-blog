import Block from '@/components/Block';
import PageContainer from '@/components/PageContainer';
import { EnrichedBlockObjectResponse, getPage } from '@/lib/notion';
import { notFound } from 'next/navigation';

export default async function SlugPage({ params }: { params: { slug: string } }) {
  try {
    const page = await getPage(params.slug);

    const getTitle = () => {
      if (page.page.properties.title.type !== 'title') return null;
      return page.page.properties.title.title[0]?.plain_text;
    };

    return (
      <PageContainer>
        <h1 className="text-4xl font-bold mb-8 text-gray-800">{getTitle()}</h1>
        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600">
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
