import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  return response.results as BlockObjectResponse[];
}

type EnrichedColumnList = Extract<BlockObjectResponse, { type: 'column_list' }> & {
  column_list: {
    children: Array<BlockObjectResponse & { children: BlockObjectResponse[] }>;
  };
};

export type EnrichedBlockObjectResponse = BlockObjectResponse | EnrichedColumnList;

export async function getPage(
  pageId?: string,
): Promise<{ page: PageObjectResponse; blocks: EnrichedBlockObjectResponse[] }> {
  const id = pageId || process.env.NOTION_PAGE_ID!;

  const page = await notion.pages.retrieve({
    page_id: id,
  });

  const blocks = await notion.blocks.children.list({
    block_id: id,
    page_size: 100,
  });

  const enrichedBlocks = await Promise.all(
    (blocks.results as BlockObjectResponse[]).map(async (block) => {
      if (block.type === 'column_list') {
        const columns = await getBlockChildren(block.id);

        const columnsWithChildren = await Promise.all(
          columns.map(async (column) => {
            const children = await getBlockChildren(column.id);
            return { ...column, children };
          }),
        );

        return {
          ...block,
          column_list: { children: columnsWithChildren },
        } as EnrichedColumnList;
      }
      return block;
    }),
  );

  return {
    page: page as PageObjectResponse,
    blocks: enrichedBlocks,
  };
}

export function extractPreviewText(blocks: BlockObjectResponse[]): string {
  const textBlocks = blocks.filter((block) => {
    return (
      block.type === 'paragraph' ||
      block.type === 'heading_1' ||
      block.type === 'heading_2' ||
      block.type === 'heading_3' ||
      block.type === 'bulleted_list_item' ||
      block.type === 'numbered_list_item'
    );
  });

  let text = '';

  for (const block of textBlocks) {
    switch (block.type) {
      case 'paragraph':
        text += block.paragraph.rich_text.map((richText) => richText.plain_text).join('');
        break;
      case 'bulleted_list_item':
        text += block.bulleted_list_item.rich_text.map((richText) => richText.plain_text).join('');
        break;
      case 'numbered_list_item':
        text += block.numbered_list_item.rich_text.map((richText) => richText.plain_text).join('');
        break;
      case 'heading_1':
        text += block.heading_1.rich_text.map((richText) => richText.plain_text).join('');
        break;
      case 'heading_2':
        text += block.heading_2.rich_text.map((richText) => richText.plain_text).join('');
        break;
      case 'heading_3':
        text += block.heading_3.rich_text.map((richText) => richText.plain_text).join('');
        break;
    }

    text += ' ';
  }

  return text.slice(0, 400);
}

export const getCategoryChildCount = async (categoryId: string) => {
  const categoryPage = await getPage(categoryId);
  return categoryPage.blocks.filter((block) => block.type === 'child_page').length;
};

export const getAllPosts = async (pageId: string) => {
  const page = await getPage(pageId);
  const categories = page.blocks.filter((block) => block.type === 'child_page');

  const posts = await Promise.all(
    categories.map(async (category) => {
      const categoryPage = await getPage(category.id);
      return categoryPage.blocks.filter((block) => block.type === 'child_page');
    }),
  );

  return posts.flat().sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());
};
