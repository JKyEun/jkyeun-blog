import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const getImageUrl = (block: ImageBlockObjectResponse) => {
  return block.image.type === 'external' ? block.image.external.url : block.image.file.url;
};

export async function getLocalImageUrl(originalUrl: string): Promise<string> {
  try {
    const imageMap = (await import('../../public/data/image-map.json')).default;
    return (imageMap as Record<string, string>)[originalUrl] || originalUrl;
  } catch (error) {
    return originalUrl;
  }
}
