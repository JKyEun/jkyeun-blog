import 'dotenv/config';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getPage(
  pageId?: string,
  cursor?: string,
): Promise<{
  page: PageObjectResponse;
  blocks: BlockObjectResponse[];
  next_cursor: string | null;
  has_more: boolean;
}> {
  const id = pageId || process.env.NOTION_PAGE_ID!;

  const page = await notion.pages.retrieve({
    page_id: id,
  });

  const blocks = await notion.blocks.children.list({
    block_id: id,
    page_size: 100,
    start_cursor: cursor,
  });

  return {
    page: page as PageObjectResponse,
    blocks: blocks.results as BlockObjectResponse[],
    next_cursor: blocks.next_cursor || null,
    has_more: blocks.has_more,
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
  const categories = page.blocks.filter(
    (block): block is Extract<BlockObjectResponse, { type: 'child_page' }> => block.type === 'child_page',
  );

  const posts = await Promise.all(
    categories.map(async (category) => {
      const categoryPage = await getPage(category.id);
      return categoryPage.blocks.filter(
        (block): block is Extract<BlockObjectResponse, { type: 'child_page' }> => block.type === 'child_page',
      );
    }),
  );

  return posts.flat().sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());
};
