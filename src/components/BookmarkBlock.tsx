'use client';

import { fetchOGData } from '@/lib/actions';
import { getCleanUrl, removeFirstSlash } from '@/utils/string';
import { BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import Link from 'next/link';
import { OgObject } from 'open-graph-scraper/types';
import { useEffect, useState } from 'react';

export default function BookmarkBlock({ block }: { block: BookmarkBlockObjectResponse }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ogData, setOgData] = useState<OgObject | null>(null);

  const { url, caption } = block.bookmark;
  const faviconUrl = ogData?.favicon?.startsWith('http')
    ? ogData.favicon
    : `${getCleanUrl(url)}/${removeFirstSlash(ogData?.favicon || '')}`;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOGData(url);
      setOgData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  if (isLoading) {
    return <div className="w-full h-[100px] bg-gray-200 animate-pulse rounded my-4" />;
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-lg hover:bg-gray-50 transition-colors my-4 overflow-hidden">
      <div className="p-4 flex gap-4">
        <div className="flex-grow min-w-0 flex flex-col justify-between">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{ogData?.ogTitle}</h3>
          {ogData?.ogDescription && <p className="text-sm text-gray-500 line-clamp-2">{ogData.ogDescription}</p>}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            {ogData?.favicon && <Image src={faviconUrl} alt="" width={16} height={16} className="rounded" />}
            <span className="truncate">{ogData?.ogSiteName}</span>
          </div>
          {caption &&
            caption.map((caption) => (
              <span key={caption.href} className="text-sm text-gray-500 block mt-2">
                {caption.plain_text}
              </span>
            ))}
        </div>
        {ogData?.ogImage?.[0] && (
          <div className="flex-shrink-0 w-40 h-[84px] relative mt-auto mb-auto">
            <Image src={ogData.ogImage[0].url} alt="" fill className="object-cover rounded" sizes="160px" />
          </div>
        )}
      </div>
    </Link>
  );
}
