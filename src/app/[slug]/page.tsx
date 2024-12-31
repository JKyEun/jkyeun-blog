import Block from '@/components/Block';
import { getPage } from '@/lib/notion';
import { notFound } from 'next/navigation';

export default async function SlugPage({ params }: { params: { slug: string } }) {
  try {
    const page = await getPage(params.slug);

    return (
      <main className="max-w-[980px] mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          {(page.page as any).properties.title.title[0]?.plain_text}
        </h1>
        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600">
          {page.blocks.map((block: any) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
