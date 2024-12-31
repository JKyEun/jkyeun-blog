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
    <div className="min-h-screen bg-gray-50">
      <nav
        className={`fixed left-0 top-0 bottom-0 bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'w-0' : 'w-72'
        }`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              JKyEun Blog
            </Link>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <IconChevronLeft />
            </button>
          </div>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.id}>
                <Link
                  href={`/${page.id}`}
                  className={`block px-4 py-3 rounded-xl transition-all ${
                    pathname === `/${page.id}`
                      ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
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
          className="fixed left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white text-gray-500 hover:text-gray-700 border border-l-0 rounded-r-xl shadow-lg transition-colors">
          <IconChevronRight />
        </button>
      )}
      <div
        className={`transition-all duration-300 min-h-screen ${isCollapsed ? 'ml-0' : 'ml-72'} bg-white shadow-inner`}>
        <div className="max-w-[980px] mx-auto p-8">{children}</div>
      </div>
    </div>
  );
}
