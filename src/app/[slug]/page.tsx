import Block from '@/components/Block';
import PageContainer from '@/components/PageContainer';
import { getPage } from '@/lib/notion';
import { formatDate } from '@/utils';
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
        <header className="mb-16">
          <h1 className="flex justify-center text-4xl font-bold mb-4 text-gray-900">{getTitle()}</h1>
          <hr className="border-gray-200" />
          <time className="flex justify-end mt-4 text-gray-600">{formatDate(page.page.created_time)}</time>
        </header>
        <div className="prose prose-lg max-w-none">
          {page.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      </PageContainer>
    );
  } catch {
    notFound();
  }
}
