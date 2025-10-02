import { extractPreviewText, getPage } from '@/lib/notion';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import { getLocalImageUrl } from '@/utils/image';

interface PostCardProps {
  id: string;
  title: string;
  createdTime: string;
}

export default async function PostCard({ id, title, createdTime }: PostCardProps) {
  const page = await getPage(id);
  const preview = extractPreviewText(page.blocks);

  const firstImageBlock = page.blocks.find((block) => block?.type === 'image') as
    | Extract<(typeof page.blocks)[number], { type: 'image' }>
    | undefined;
  const imageUrl = firstImageBlock && getLocalImageUrl(firstImageBlock.id);

  return (
    <Link href={`/${id}`} className="group block">
      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 flex gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2 break-all">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-3">{preview}</p>
          <div className="text-sm text-gray-500 mt-4">{formatDate(createdTime)}</div>
        </div>
        {imageUrl && (
          <div className="relative w-[150px] h-[150px] flex-shrink-0 overflow-hidden hidden md:block">
            <Image
              src={imageUrl}
              alt={`${title} 포스트의 대표 이미지`}
              width={150}
              height={150}
              className="object-cover rounded-md"
            />
          </div>
        )}
      </article>
    </Link>
  );
}
