import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion';
import { PAGE_ROUTES } from '@/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsPages = await getAllPosts(PAGE_ROUTES.POSTS.id);
  const notesPages = await getAllPosts(PAGE_ROUTES.NOTES.id);

  const allPages = [...postsPages, ...notesPages];

  const staticPages = [
    {
      url: 'https://jkyeun.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://jkyeun.com/posts',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://jkyeun.com/notes',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const dynamicPages = allPages.map((page) => ({
    url: `https://jkyeun.com/${page.id}`,
    lastModified: new Date(page.last_edited_time),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...dynamicPages];
}
