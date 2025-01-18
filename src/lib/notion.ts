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
