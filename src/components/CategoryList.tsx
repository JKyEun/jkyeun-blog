import { getCategoryChildCount, getPage } from '@/lib/notion';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';

export default async function CategoryList({ pageId, title }: { pageId: string; title: string }) {
  const page = await getPage(pageId);
  const categories = page.blocks.filter(
    (block): block is Extract<BlockObjectResponse, { type: 'child_page' }> => block.type === 'child_page',
  );

  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      childCount: await getCategoryChildCount(category.id),
    })),
  );

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{title}</h1>
      <div className="grid gap-4">
        {categoriesWithCount.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="block bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {category.child_page.title}
                </h2>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  {category.childCount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
