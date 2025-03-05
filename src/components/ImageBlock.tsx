'use client';

import { getOriginalImageUrl, getLocalImageUrl } from '@/utils/image';
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageBlock({ block }: { block: ImageBlockObjectResponse }) {
  const [hasLocalImage, setHasLocalImage] = useState(true);

  const localUrl = getLocalImageUrl(block.id);
  const originalUrl = getOriginalImageUrl(block);
  const caption = block.image.caption?.length ? block.image.caption[0].plain_text : '';

  if (!localUrl && !originalUrl) return null;

  return (
    <figure className="my-6">
      <div className="relative w-full h-[400px]">
        <Image
          src={hasLocalImage ? localUrl : originalUrl}
          alt={caption}
          fill
          className="object-contain"
          sizes="(max-width: 980px) 100vw, 980px"
          onError={() => setHasLocalImage(false)}
        />
      </div>
      {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  );
}
