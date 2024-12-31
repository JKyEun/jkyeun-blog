import { getChildPages } from '@/lib/notion';
import Link from 'next/link';

export default async function Home() {
  const childPages = await getChildPages();

  return (
    <main className="max-w-[980px] mx-auto py-7 px-4">
      <h1 className="text-3xl font-bold mb-6">공부 기록</h1>
      <div className="grid gap-4">
        {childPages.map((page) => (
          <Link key={page.id} href={`/${page.id}`} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <h2 className="text-xl font-semibold">{page.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
