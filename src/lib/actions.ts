'use server';

import ogs from 'open-graph-scraper';
import { getPage } from './notion';

export async function fetchBlocks(pageId: string, cursor?: string) {
  try {
    const response = await getPage(pageId, cursor);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch blocks');
  }
}

export async function fetchOGData(url: string) {
  try {
    const { result } = await ogs({ url });
    return result;
  } catch (error) {
    throw new Error('Failed to fetch OG data');
  }
}
