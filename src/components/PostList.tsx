import { getPage } from '@/lib/notion';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Block from './Block';

export default async function PostList({ pageId }: { pageId: string }) {
  const page = await getPage(pageId);
  const availableBlocks = page.blocks.filter(
    (block): block is Extract<BlockObjectResponse, { type: 'child_page' | 'heading_1' | 'heading_2' }> =>
      block.type === 'child_page' || block.type === 'heading_1' || block.type === 'heading_2',
  );
  const postCount = availableBlocks.filter((block) => block.type === 'child_page').length;

  const getTitle = () => {
    if (page.page.properties.title.type !== 'title') return null;
    return page.page.properties.title.title[0]?.plain_text;
  };

  return (
    <>
      <header className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{getTitle()}</h1>
        <p className="text-gray-500 text-lg">
          총 <span className="font-semibold text-indigo-600">{postCount}</span>개의 글
        </p>
      </header>
      <div className="space-y-6">
        {availableBlocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </div>
    </>
  );
}
