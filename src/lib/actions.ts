'use server';

import { getPage } from './notion';

export async function fetchBlocks(pageId: string, cursor?: string) {
  try {
    const response = await getPage(pageId, cursor);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch blocks');
  }
}
