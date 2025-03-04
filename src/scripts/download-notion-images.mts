import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { getPage } from '@/lib/notion';
import { PAGE_ROUTES } from '@/constants';
import { ChildPageBlockObjectResponse, ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getImageUrl } from '@/utils/image';

const imageMap: Record<string, string> = {};

async function downloadImage(imageUrl: string, fileName: string): Promise<string | null> {
  try {
    const response = await axios.get<ArrayBuffer>(imageUrl, {
      responseType: 'arraybuffer',
    });

    const imagesDir = path.join(process.cwd(), 'public/notion-images');
    const filePath = path.join(imagesDir, fileName);

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const uint8Array = new Uint8Array(response.data);
    fs.writeFileSync(filePath, uint8Array);

    return `/notion-images/${fileName}`;
  } catch (error) {
    return null;
  }
}

async function processImageBlock(block: ImageBlockObjectResponse): Promise<void> {
  if (block.type !== 'image') return;

  const imageUrl = getImageUrl(block);

  if (!imageUrl) return;
  if (imageMap[imageUrl]) return;

  const fileName = `image-${block.id}.jpg`;
  const localPath = await downloadImage(imageUrl, fileName);

  if (localPath) {
    imageMap[imageUrl] = localPath;
  }
}

async function processAllPosts(): Promise<void> {
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

  const dataDir = path.join(process.cwd(), 'public/data');
  const jsonPath = path.join(dataDir, 'image-map.json');

  if (fs.existsSync(jsonPath)) {
    fs.unlinkSync(jsonPath);
  }

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(imageMap, null, 2));
}

try {
  processAllPosts();
} catch (error) {
  console.error(error);
}
