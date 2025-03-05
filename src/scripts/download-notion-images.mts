import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import { getPage } from '@/lib/notion';
import { PAGE_ROUTES } from '@/constants';
import { ChildPageBlockObjectResponse, ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getOriginalImageUrl } from '@/utils/image';

async function downloadImage(imageUrl: string, fileName: string) {
  try {
    const response = await axios.get<ArrayBuffer>(imageUrl, {
      responseType: 'arraybuffer',
    });

    const imagesDir = path.join(process.cwd(), 'public/notion-images');
    const filePath = path.join(imagesDir, fileName);

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    await sharp(Buffer.from(response.data)).webp({ quality: 80 }).toFile(filePath);
  } catch (error) {
    console.error(error);
  }
}

async function processImageBlock(block: ImageBlockObjectResponse) {
  if (block.type !== 'image') return;

  const imageUrl = getOriginalImageUrl(block);
  if (!imageUrl) return;

  const fileName = `image-${block.id}.webp`;
  await downloadImage(imageUrl, fileName);
}

async function processAllPosts() {
  for (const route of Object.values(PAGE_ROUTES)) {
    const categoryPage = await getPage(route.id);
    const categories = categoryPage.blocks.filter(
      (block): block is ChildPageBlockObjectResponse => block.type === 'child_page',
    );

    for (const category of categories) {
      const postsPage = await getPage(category.id);
      const posts = postsPage.blocks.filter(
        (block): block is ChildPageBlockObjectResponse => block.type === 'child_page',
      );

      for (const post of posts) {
        const postPage = await getPage(post.id);

        for (const block of postPage.blocks) {
          if (block.type === 'image') {
            await processImageBlock(block as ImageBlockObjectResponse);
          }
        }
      }
    }
  }
}

try {
  processAllPosts();
} catch (error) {
  console.error(error);
}
