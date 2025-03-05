import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const getOriginalImageUrl = (block: ImageBlockObjectResponse) => {
  return block.image.type === 'external' ? block.image.external.url : block.image.file.url;
};

export const getLocalImageUrl = (blockId: string) => {
  return `/notion-images/image-${blockId}.webp`;
};
