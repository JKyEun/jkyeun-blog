import Block from '@/components/Block';
import { getPage } from '@/lib/notion';

export default async function Home() {
  const page = await getPage();

  return (
    <main className="max-w-[980px] mx-auto py-7 px-4">
      <h1 className="text-3xl font-bold mb-6">공부 기록</h1>
      <div className="grid gap-4">
        {page.blocks.map((page) => (
          <Block key={page.id} block={page} isMainPage />
        ))}
      </div>
    </main>
  );
}
