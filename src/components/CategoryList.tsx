import { getCategoryChildCount, getPage } from '@/lib/notion';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';

export default async function CategoryList({ pageId }: { pageId: string }) {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="space-y-2">
        {categoriesWithCount.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="block py-2 text-gray-800 font-medium hover:text-blue-600 transition-colors">
            {category.child_page.title}
            <span className="text-sm text-gray-500 ml-2">({category.childCount})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
