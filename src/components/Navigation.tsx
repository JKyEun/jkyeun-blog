'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface NavigationProps {
  menus: Extract<BlockObjectResponse, { type: 'child_page' }>[];
}

export default function Navigation({ menus }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-[1440px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            JKyEun Blog
          </Link>
          <div className="flex gap-6">
            {menus.map((menu) => {
              return (
                <Link
                  key={menu.id}
                  href={`/${menu.id}`}
                  className={`text-lg hover:text-blue-600 transition-colors ${
                    pathname.startsWith(`/${menu.id}`) ? 'text-blue-800' : 'text-gray-800'
                  }`}>
                  {menu.child_page.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
