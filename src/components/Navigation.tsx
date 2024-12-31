'use client';

import { IconChevronLeft, IconChevronRight } from '@/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavigationProps {
  pages: Array<{
    id: string;
    title: string;
  }>;
  children: React.ReactNode;
}

export default function Navigation({ pages, children }: NavigationProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <nav
        className={`fixed left-0 top-0 bottom-0 bg-white border-r overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'w-0' : 'w-64'
        }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-600">
              JKyEun Blog
            </Link>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <IconChevronLeft />
            </button>
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
        </div>
      </nav>
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-l-0 rounded-r-lg shadow-md">
          <IconChevronRight />
        </button>
      )}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-0' : 'ml-64'}`}>
        <div className="max-w-[980px] mx-auto">{children}</div>
      </div>
    </>
  );
}
