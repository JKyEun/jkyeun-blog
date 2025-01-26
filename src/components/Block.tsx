import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import Image from 'next/image';

type ImageBlockObjectResponse = Extract<BlockObjectResponse, { type: 'image' }>;
type BookmarkBlockObjectResponse = Extract<BlockObjectResponse, { type: 'bookmark' }>;
type LinkPreviewBlockObjectResponse = Extract<BlockObjectResponse, { type: 'link_preview' }>;
type ColumnListBlockObjectResponse = Extract<BlockObjectResponse, { type: 'column_list' }> & {
  column_list: {
    children: Array<BlockObjectResponse & { children: BlockObjectResponse[] }>;
  };
};

function ImageBlock({ block }: { block: ImageBlockObjectResponse }) {
  const imageUrl = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
  const caption = block.image.caption?.length ? block.image.caption[0].plain_text : '';

  return (
    <figure className="my-6">
      <div className="relative w-full h-[400px]">
        <Image src={imageUrl} alt={caption} fill className="object-contain" sizes="(max-width: 980px) 100vw, 980px" />
      </div>
      {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  );
}

function BookmarkBlock({ block }: { block: BookmarkBlockObjectResponse }) {
  const { url, caption } = block.bookmark;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors my-4">
      <div className="flex flex-col gap-1">
        <span className="text-blue-600 hover:underline break-all">{url}</span>
        {caption &&
          caption.map((caption) => (
            <span key={caption.href} className="text-sm text-gray-500">
              {caption.plain_text}
            </span>
          ))}
      </div>
    </Link>
  );
}

function LinkPreviewBlock({ block }: { block: LinkPreviewBlockObjectResponse }) {
  const { url } = block.link_preview;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors my-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 flex-grow min-w-0">
          <span className="text-sm text-blue-600 hover:underline truncate">{url}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Block({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id} className="mb-4">
          {block.paragraph.rich_text[0]?.plain_text}
        </p>
      );
    case 'heading_1':
      return (
        <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">
          {block.heading_1.rich_text[0]?.plain_text}
        </h1>
      );
    case 'heading_2':
      return (
        <h2 key={block.id} className="text-2xl font-bold mt-6 mb-4">
          {block.heading_2.rich_text[0]?.plain_text}
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={block.id} className="text-xl font-bold mt-4 mb-3">
          {block.heading_3.rich_text[0]?.plain_text}
        </h3>
      );
    case 'bulleted_list_item':
      return (
        <li key={block.id} className="ml-4">
          {block.bulleted_list_item.rich_text[0]?.plain_text}
        </li>
      );
    case 'numbered_list_item':
      return (
        <li key={block.id} className="ml-4 list-decimal">
          {block.numbered_list_item.rich_text[0]?.plain_text}
        </li>
      );
    case 'code':
      return (
        <pre key={block.id} className="bg-gray-100 p-4 rounded-lg my-4">
          <code className="text-gray-800">{block.code.rich_text[0]?.plain_text}</code>
        </pre>
      );
    case 'column_list':
      return (() => {
        const columnListBlock = block as ColumnListBlockObjectResponse;
        return (
          <div key={block.id} className="grid grid-cols-2 gap-4 my-4">
            {columnListBlock.column_list.children.map((column) => (
              <div key={column.id}>
                {column.children.map((childBlock) => (
                  <Block key={childBlock.id} block={childBlock} />
                ))}
              </div>
            ))}
          </div>
        );
      })();
    case 'image':
      return <ImageBlock block={block} />;
    case 'bookmark':
      return <BookmarkBlock block={block} />;
    case 'link_preview':
      return <LinkPreviewBlock block={block} />;
    case 'divider':
      return <hr key={block.id} className="my-8 border-t border-gray-200" />;
    case 'child_page':
      return (
        <Link
          href={`/${block.id}`}
          key={block.id}
          className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors mb-4 no-underline">
          <h2 className="text-xl font-semibold mb-0 mt-0">{block.child_page.title}</h2>
        </Link>
      );
    default:
      console.log(block.type);
      return null;
  }
}
