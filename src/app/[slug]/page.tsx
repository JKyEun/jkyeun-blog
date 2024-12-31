import Block from '@/components/Block';
import { getPage } from '@/lib/notion';
import { notFound } from 'next/navigation';

export default async function SlugPage({ params }: { params: { slug: string } }) {
  try {
    const page = await getPage(params.slug);

    return (
      <main className="max-w-[980px] mx-auto py-7 px-4">
        <h1 className="text-3xl font-bold mb-6">{(page.page as any).properties.title.title[0]?.plain_text}</h1>
        <div className="prose max-w-none">
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
