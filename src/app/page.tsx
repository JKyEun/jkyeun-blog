import Block from '@/components/Block';
import { getPage } from '@/lib/notion';

export default async function Home() {
  const page = await getPage();

  return (
    <main className="max-w-[980px] mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">공부 기록</h1>
      <div className="grid gap-6">
        {page.blocks.map((page) => (
          <Block key={page.id} block={page} isMainPage />
        ))}
      </div>
    </main>
  );
}
