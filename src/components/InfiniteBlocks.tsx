'use client';

import { useEffect, useRef, useState } from 'react';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Block from './Block';
import { fetchBlocks } from '@/lib/actions';

interface InfiniteBlocksProps {
  initialBlocks: BlockObjectResponse[];
  pageId: string;
  hasMore: boolean;
  initialCursor: string | null;
}

export default function InfiniteBlocks({
  initialBlocks,
  pageId,
  hasMore: initialHasMore,
  initialCursor,
}: InfiniteBlocksProps) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          try {
            const data = await fetchBlocks(pageId, cursor || undefined);

            setBlocks((prev) => [...prev, ...data.blocks]);
            setCursor(data.next_cursor);
            setHasMore(data.has_more);
          } catch (error) {
            throw new Error('Failed to fetch more blocks');
          } finally {
            setIsLoading(false);
          }
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [cursor, hasMore, isLoading, pageId]);

  return (
    <>
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
      {hasMore && (
        <div ref={observerTarget} className="h-10 flex items-center justify-center">
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
