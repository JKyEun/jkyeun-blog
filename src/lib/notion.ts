import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getPage(pageId?: string) {
  const id = pageId || process.env.NOTION_PAGE_ID!;

  const page = await notion.pages.retrieve({
    page_id: id,
  });

  const blocks = await notion.blocks.children.list({
    block_id: id,
    page_size: 100,
  });

  return {
    page,
    blocks: blocks.results,
  };
}
