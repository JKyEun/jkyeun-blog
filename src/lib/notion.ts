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

export async function getChildPages() {
  try {
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page',
      },
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time',
      },
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.title.title[0]?.plain_text || '제목 없음',
      slug: page.id,
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}
