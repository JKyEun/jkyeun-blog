'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  pages: Array<{
    id: string;
    title: string;
  }>;
}

export default function Navigation({ pages }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r p-6 overflow-y-auto">
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-600">
          JKyEun Blog
        </Link>
      </div>
      <ul className="space-y-2">
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              href={`/${page.id}`}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                pathname === `/${page.id}`
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
