'use client';

import { getImageUrl, getLocalImageUrl } from '@/utils/image';
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageBlock({ block }: { block: ImageBlockObjectResponse }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      const originalImageUrl = getImageUrl(block);
      const localUrl = await getLocalImageUrl(originalImageUrl);
      setImageUrl(localUrl);
    };

    loadImage();
  }, [block]);

  const caption = block.image.caption?.length ? block.image.caption[0].plain_text : '';

  return (
    <figure className="my-6">
      {imageUrl && (
        <div className="relative w-full h-[400px]">
          <Image src={imageUrl} alt={caption} fill className="object-contain" sizes="(max-width: 980px) 100vw, 980px" />
        </div>
      )}
      {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  );
}
