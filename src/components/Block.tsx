import {
  BlockObjectResponse,
  BookmarkBlockObjectResponse,
  LinkPreviewBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import PostCard from './PostCard';
import ImageBlock from './ImageBlock';
import { Highlight, themes } from 'prism-react-renderer';

function BookmarkBlock({ block }: { block: BookmarkBlockObjectResponse }) {
  const { url, caption } = block.bookmark;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors my-4">
      <div className="flex flex-col gap-1">
        <span className="text-indigo-600 hover:underline break-all">{url}</span>
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
          <span className="text-sm text-indigo-600 hover:underline truncate">{url}</span>
        </div>
      </div>
    </Link>
  );
}

function RichText({ text }: { text: RichTextItemResponse }) {
  if (!text) return null;
  if (text.type === 'equation') return null;
  if (text.type === 'mention') return null;

  const {
    annotations: { bold, code, color, italic, strikethrough, underline },
    text: { content, link },
  } = text;

  const className = [
    bold ? 'font-bold' : '',
    code ? 'bg-gray-100 px-1 py-0.5 rounded font-mono text-sm' : '',
    italic ? 'italic' : '',
    strikethrough ? 'line-through' : '',
    underline ? 'underline' : '',
    color !== 'default' ? `text-${color}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (link) {
    return (
      <a
        href={link.url}
        className={`text-indigo-600 hover:underline ${className}`}
        target="_blank"
        rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <span className={className}>{content}</span>;
}

export default function Block({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id} className="mb-4">
          {block.paragraph.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </p>
      );
    case 'heading_1':
      return (
        <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">
          {block.heading_1.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </h1>
      );
    case 'heading_2':
      return (
        <h2 key={block.id} className="text-2xl font-bold mt-6 mb-4">
          {block.heading_2.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={block.id} className="text-xl font-bold mt-4 mb-3">
          {block.heading_3.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </h3>
      );
    case 'bulleted_list_item':
      return (
        <li key={block.id} className="ml-4">
          {block.bulleted_list_item.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </li>
      );
    case 'numbered_list_item':
      return (
        <li key={block.id} className="ml-4 list-decimal">
          {block.numbered_list_item.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </li>
      );
    case 'code':
      return (
        <div key={block.id} className="my-4 text-sm">
          <Highlight theme={themes.github} code={block.code.rich_text[0].plain_text} language={block.code.language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} p-4 rounded-lg overflow-auto`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      );
    case 'image':
      return <ImageBlock block={block} />;
    case 'bookmark':
      return <BookmarkBlock block={block} />;
    case 'link_preview':
      return <LinkPreviewBlock block={block} />;
    case 'divider':
      return <hr key={block.id} className="my-8 border-t border-gray-200" />;
    case 'child_page':
      return <PostCard id={block.id} title={block.child_page.title} createdTime={block.created_time} />;
    case 'quote':
      return (
        <blockquote key={block.id} className="border-l-4 border-gray-300 pl-4 my-4 italic">
          {block.quote.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </blockquote>
      );
    default:
      console.log(block.type);
      return null;
  }
}
